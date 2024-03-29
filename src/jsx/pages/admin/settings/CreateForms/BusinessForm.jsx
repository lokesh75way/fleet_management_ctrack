import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/BusinessGroupTabs/MyAccount";
import UserSetting from "../../../../components/TabComponent/BusinessGroupTabs/UserSetting";
import ManagePassword from "../../../../components/TabComponent/AdminProfileTabs/ManagePassword";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  businessGroupAccountSchema,
  businessGroupSettingSchema,
} from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  changePassword,
  createGroup,
  updateGroup,
} from "../../../../../services/api/BusinessGroup";
import { storageCapacityOptions } from "../../../../components/TabComponent/VehicleTabs/Options";

const BusinessForm = ({ Title, editData, setEditData }) => {
  const { t } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  let tabHeading = [t("newBusinessGroup"), t("settings"), t("changePassword")];
  let component = [MyAccount, UserSetting, ManagePassword];
  const navigate = useNavigate();

  const { id } = useParams();

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
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      activeIndex === 1
        ? businessGroupSettingSchema
        : businessGroupAccountSchema
    ),
    defaultValues: {
      // storageCapacity : storageCapacityOptions[0]
    },
  });

  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - (id ? 2 : 1)) {
      try {
        if (id) {
          console.log("Hello");
          console.log(data);
          delete data["oldPassword"];
          delete data["newPassword"];
          delete data["retypePassword"];
          console.log(data);
          // if(data.zipCode === ''){
          delete data.zipCode;
          // }
          console.log(data);
          await updateGroup(data);
          notifySuccess("Business group has been updated!");
        } else {
          await createGroup(data);
          notifySuccess("New Business group Created!");
        }
        navigate("/business");

        return;
      } catch (error) {
        console.log("data udpated", updateGroup);
        await updateGroup(data);
        notifyError("Some error occured !!");
      }
    } else if (activeIndex === 2) {
      try {
        const passwordData = {
          password: data.newPassword,
          oldPassword: data.oldPassword,
          confirmPassword: data.retypePassword,
          _id: id,
        };
        await changePassword(passwordData);
        notifySuccess("Password has been changed");
        navigate("/business")
      } catch (error) {
        notifyError("Password is not changes!");
      }
    }
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
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
export default BusinessForm;
