import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import CreateForm from "../components/Form";
import { companyAccountSchema, companyPasswordSchema } from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import ChangePassword from "@/components/Form/ChangePassword";
import { addCompany, changePassword, editCompany } from "../api";
import { getApiErrorMessage } from "@/utils/helper";

const CreateCompany = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  let tabHeading = [
    id ? t("editCompany") : t("newCompany"),
    t("changePassword"),
  ];
  let component = [CreateForm, ChangePassword];
  const [activeIndex, setActiveIndex] = useState(0);
  const queryClient = useQueryClient();

  if (!id) {
    tabHeading = [t("newCompany")];
    component = [CreateForm];
  }

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      businessGroupId: "",
      userInfo: [
        {
          name: "",
          designation: "",
          mobileNumber: null,
          email: "",
        },
      ],
    },
    resolver: yupResolver(
      activeIndex === 1 ? companyPasswordSchema : companyAccountSchema(id)
    ),
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));

  const { mutate: editCompanyMutation, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => editCompany(id, data),
    onSuccess: () => {
      notifySuccess("Company Updated Successfully");
      queryClient.invalidateQueries(["companies"]);
      navigate("/company");
    },
    onError,
  });

  const { mutate: createCompanyMutation, isPending: createPending } =
    useMutation({
      mutationFn: addCompany,
      onSuccess: () => {
        notifySuccess("New Company Created");
        queryClient.invalidateQueries(["companies"]);
        navigate("/company");
      },
      onError,
    });

  const { mutate: passwordMutation, isPending: passwordPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      notifySuccess("Password has been changed");
      navigate("/company");
    },
    onError,
  });

  const onSubmit = async (data) => {
    if (activeIndex === 0) {
      if (data.logo == null || data.logo.length === 0) {
        delete data.logo;
      }
      if (data.file && data.file.length === 0) {
        delete data.file;
      }
      if (id) {
        editCompanyMutation({ data, id });
      } else {
        createCompanyMutation(data);
      }
    } else if (activeIndex === 1) {
      const passwordData = {
        password: data.newPassword,
        oldPassword: data.oldPassword,
        confirmPassword: data.confirmPassword,
        _id: id,
      };

      passwordMutation(passwordData);
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("company")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("company")}
      />
      <div className="m-2 p-2">
        <FormProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="default-tab">
              <Tab.Container defaultActiveKey={tabHeading[0].toLowerCase()}>
                <Nav as="ul" className="nav-tabs">
                  {tabHeading.map((data, i) => (
                    <Nav.Item as="li" key={i}>
                      <Nav.Link
                        style={{ padding: ".5rem 2rem" }}
                        eventKey={data.toLowerCase()}
                        active={i === activeIndex}
                        onClick={() => setActiveIndex(i)}
                      >
                        {data}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Tab.Content className="pt-4">
                  {tabHeading.map((data, i) => {
                    const Component = component[i];
                    return (
                      <Tab.Pane
                        eventKey={data.toLowerCase()}
                        key={i}
                        active={i === activeIndex}
                      >
                        <Component
                          data={tabHeading}
                          control={control}
                          setValue={setValue}
                          register={register}
                          getValues={getValues}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          onSubmit={onSubmit}
                          isFormSubmitting={
                            createPending || editPending || passwordPending
                          }
                        />
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </Tab.Container>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default CreateCompany;
