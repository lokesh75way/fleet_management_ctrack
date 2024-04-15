import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/CompanyTabs/MyAccount";
import UserSetting from "../../../../components/TabComponent/CompanyTabs/UserSetting";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  companyAccountSchema,
  companyPasswordSchema,
  companySettingSchema,
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
import { dateFormatOptions } from "../../../../components/TabComponent/VehicleTabs/Options";
const CompanyForm = () => {
  const { t } = useTranslation();
  const { saveData } = useStorage();
  const navigate = useNavigate();

  let tabHeading = [t("newCompany"), t("settings"), t("changePassword")];
  let component = [MyAccount, UserSetting, ManagePassword];
  const { id } = useParams();
  const location = useLocation();
  const { formData } = location.state || {};
  const [activeIndex, setActiveIndex] = useState(0);
  // ManagePassword , t('changePassword')

  if (!id) {
    tabHeading = [t("newBusinessGroup"), t("settings")];
    component = [MyAccount, UserSetting];
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
    resolver: yupResolver(
      activeIndex === 1
        ? companySettingSchema
        : activeIndex === 2
        ? companyPasswordSchema
        : companyAccountSchema
    ),
  });
  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - (id ? 2 : 1)) {
      try {
        if (id) {
          try {
            // data.businessGroupId = getValues("businessId");
            if (data.logo.length === 0) {
              delete data.logo;
            }
            if (data.file.length === 0) {
              delete data.file;
            }
            await editCompany(data);
            notifySuccess("Company Updated Successfully");
            navigate("/company");
            return;
          } catch (e) {
            console.log(e);
            notifyError("Some error occured");
          }
          return;
        } else {
          try {
            if (data.logo && data.logo.length === 0) {
              delete data.logo;
            }
            if (data.file && data.file.length === 0) {
              delete data.file;
            }
            data.businessGroupId = getValues("businessGroupId");
            await addCompany(data);
            notifySuccess("New Company Created");
            navigate("/company");
            return;
          } catch (e) {
            notifyError("Some error occured");
          }
        }
      } catch (error) {
        notifyError("Some error occured !!");
      }
    } else if (activeIndex === 2) {
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
        console.log(error);
        notifyError("Password is not changes!");
      }
    }
    // console.log(activeIndex);
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
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
