import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/BranchTabs/MyAccount";
import UserSetting from "../../../../components/TabComponent/BranchTabs/UserSetting";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchAccountSchema, companySettingSchema } from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import ManagePassword from "../../../../components/TabComponent/AdminProfileTabs/ManagePassword";

const BranchForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["New Branch", "Setting","Change Password"];
  const component = [MyAccount, UserSetting,ManagePassword];
  const totalTabs = tabHeading.length;
  const navigate = useNavigate();
  const { id } = useParams();
  if(!id){
    component.pop();
    tabHeading.pop();
  }
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(
      activeIndex === 0 ? branchAccountSchema : companySettingSchema
    ),
  });

  const onSubmit = (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        if (id) {
          const val = JSON.parse(localStorage.getItem("userJsonData"));
          const indexToUpdate = val.findIndex((item) => item.id == id);
          if (indexToUpdate !== -1) {
            val[indexToUpdate] = { ...data, id , role : "branch"};
            localStorage.setItem("userJsonData", JSON.stringify(val));
            notifySuccess("Branch Updated!");
            navigate("/branch");
          }
          return;
        } else {
          data = { ...data, role: "branch" };
          const existingData = JSON.parse(localStorage.getItem("userJsonData"));
          data.id = existingData.length + 1;
          existingData.push(data);
          localStorage.setItem("userJsonData", JSON.stringify(existingData));
          // notifySuccess("Branch Added Successfully !!");
          notifySuccess("New Branch Created!");
          navigate("/branch");
          return;
        }
      } catch (error) {
        notifyError("Some error occured !!");
      }
    }
    notifySuccess("Saved!");
    if(!id){
      navigate('/branch')
    }
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };
  return (
    <>
      <MainPagetitle
        mainTitle="Branch"
        pageTitle={id? "Edit" : "Create"}
        parentTitle={"Branch"}
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
export default BranchForm;
