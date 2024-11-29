import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../components/MainPagetitle";
import MyAccount from "../../../../features/company/components/Form";
import UserSetting from "../../../components/TabComponent/CompanyTabs/UserSetting";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  companyAccountSchema,
  companySettingSchema,
} from "../../../../utils/yup";

const MyProfile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["My Account", "User Setting"];
  const component = [MyAccount, UserSetting];
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
      activeIndex === 0 ? companyAccountSchema : companySettingSchema
    ),
  });

  const onSubmit = (data) => {
    if (activeIndex === totalTabs - 1) {
      console.log(data);
      return;
    }
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };

  return (
    <>
      <MainPagetitle
        mainTitle="My Profile"
        pageTitle={"my-profile / create"}
        parentTitle={"Manage Profile"}
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
export default MyProfile;
