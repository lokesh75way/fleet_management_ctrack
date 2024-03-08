import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/BusinessGroupTabs/MyAccount";
import UserSetting from "../../../../components/TabComponent/BusinessGroupTabs/UserSetting";
import { yupResolver } from "@hookform/resolvers/yup";
import { businessGroupAccountSchema, companySettingSchema } from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";

const BusinessForm = ({ Title, editData, setEditData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["My Account", "User Setting"];
  const component = [MyAccount, UserSetting];
  const totalTabs = tabHeading.length;
  const navigate = useNavigate()
  const { id } = useParams(); 

  // Fetch data from local storage when the id changes
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("businessData"));
    console.log(existingData, id)
    const businessData = existingData.find((item) => item.id === id);
    console.log(businessData, 'nus')
    if (businessData) {
      reset(businessData);
    }
  }, [id]);


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
      activeIndex === 0 ? businessGroupAccountSchema : companySettingSchema
    ),
  });

  const onSubmit = (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        const existingData = JSON.parse(localStorage.getItem("businessData"));
        data.id = `${existingData.length + 1}`;
        existingData.push(data);
        localStorage.setItem("businessData", JSON.stringify(existingData));
        notifySuccess("Business Group Added Successfully !!");
        navigate("/business");
        return;
      } catch (error) {
        notifyError("Some error occured !!");
      }

    }

    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };
  return (
    <>
      <MainPagetitle
        mainTitle="Business User"
        pageTitle={"Create"}
        parentTitle={"Business User"}
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
