import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/CompanyTabs/MyAccount";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  companyAccountSchema,
  companyPasswordSchema,
} from "../../../../../yup";
import useStorage from "../../../../../hooks/useStorage";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ManagePassword from "../../../../components/TabComponent/AdminProfileTabs/ManagePassword";
import { useTranslation } from "react-i18next";
import {
  addCompany,
  changePassword,
  editCompany,
} from "../../../../../services/api/CompanyServices";
import { getApiErrorMessage } from "../../../../../utils/helper";

const CompanyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  let tabHeading = [
    id ? t("editCompany") : t("newCompany"),
    t("changePassword"),
  ];
  let component = [MyAccount, ManagePassword];
  const location = useLocation();
  const { formData } = location.state || {};
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!id) {
    tabHeading = [t("newCompany")];
    component = [MyAccount];
  }

  const totalTabs = tabHeading.length;

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
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
      activeIndex === 1 ? companyPasswordSchema : companyAccountSchema
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
          await editCompany(data);
          notifySuccess("Company Updated Successfully");
          navigate("/company");
        } else {
          await addCompany(data);
          notifySuccess("New Company Created");
          navigate("/company");
        }
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
        navigate("/company");
      } catch (error) {
        notifyError(getApiErrorMessage(error));
      }
    }
    setIsSubmitting(false);
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
                          formData={formData}
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
export default CompanyForm;
