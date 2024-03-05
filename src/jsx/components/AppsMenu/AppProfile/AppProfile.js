import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import useDriverSubmit from "../../../../hooks/useDriverSubmit";
import MainPagetitle from "../../../layouts/MainPagetitle";
import Email from "../../../components/TabComponent/CompanyTabs/Email";
import MyAccount from "../../../components/TabComponent/CompanyTabs/MyAccount";
import UserSetting from "../../../components/TabComponent/CompanyTabs/UserSetting";

const AppProfile = ({ Title, editData, setEditData }) => {
  const {
    register,
    onSubmit,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useDriverSubmit();

  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["My Account", "User Setting", "Email"];
  const component = [MyAccount, UserSetting, Email];
  const totalTabs = tabHeading.length;
  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1)); // Increment active tab index
  };
  
  return (
    <>
      <MainPagetitle
        mainTitle="Company Details"
        pageTitle={"Company Details"}
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
                          handleNext={handleNext}
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
export default AppProfile;
