import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "@/components/MainPagetitle";
import CreateForm from "../components/Form";
import ChangePassword from "@/components/Form/ChangePassword";
import { businessGroupAccountSchema, companyPasswordSchema } from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { changePassword, createGroup, updateGroup } from "../api";
import { getApiErrorMessage } from "@/utils/helper";

const CreateBusiness = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  let tabHeading = [
    id ? t("editBusinessGroup") : t("newBusinessGroup"),
    t("changePassword"),
  ];
  let component = [CreateForm, ChangePassword];
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!id) {
    tabHeading = [t("newBusinessGroup")];
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
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
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
      activeIndex === 0 ? businessGroupAccountSchema : companyPasswordSchema
    ),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    if (activeIndex === 0) {
      try {
        if (data.logo == null || data.logo.length === 0) {
          delete data.logo;
        }
        if (data.file && data.file.length === 0) {
          delete data.file;
        }
        if (id) {
          await updateGroup(data);
          notifySuccess("Business group has been updated!");
          navigate("/business");
          return;
        } else {
          await createGroup(data);
          notifySuccess("Business group created");
        }
        navigate("/business");
      } catch (error) {
        notifyError(getApiErrorMessage(error));
      }
    } else if (activeIndex === 1) {
      try {
        const passwordData = {
          password: data.newPassword,
          oldPassword: data.oldPassword,
          confirmPassword: data.confirmPassword,
          _id: id,
        };
        await changePassword(passwordData);
        notifySuccess("Password has been changed");
        navigate("/business");
      } catch (error) {
        notifyError(getApiErrorMessage(error));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("businessGroup")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("businessGroup")}
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
                          isFormSubmitting={isSubmitting}
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
export default CreateBusiness;
