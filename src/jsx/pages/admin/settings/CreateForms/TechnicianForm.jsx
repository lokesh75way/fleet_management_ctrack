import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, use, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import General from "../../../../components/TabComponent/TecnicianTab/General";
import Address from "../../../../components/TabComponent/TecnicianTab/Address";
import Leave from "../../../../components/TabComponent/TecnicianTab/Leave";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  technicianGeneralSchema,
  technicianAddressSchema,
  technicianLeaveSchema,
} from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";

const TechnicianForm = ({ Title, editData, setEditData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const tabHeading = ["General", "Address", "Leave"];
  const component = [General, Address, Leave];
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
      activeIndex === 0
        ? technicianGeneralSchema
        : activeIndex === 1
        ? technicianAddressSchema
        : technicianLeaveSchema
    ),
  });
  const { id } = useParams();
  const onSubmit = (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        const existingData = JSON.parse(localStorage.getItem("userJsonData"));
        if (id) {
          const val = JSON.parse(localStorage.getItem("userJsonData"));
          const indexToUpdate = val.findIndex((item) => item.id == id);
          if (indexToUpdate !== -1) {
            val[indexToUpdate] = { ...data, id, Designation: "Technician" };
            localStorage.setItem("userJsonData", JSON.stringify(val));
            notifySuccess("Technician Updated!");
            navigate("/technician");
          }
          return;
        } else {
          data = { ...data, Designation: "Technician" };
          const existingData = JSON.parse(localStorage.getItem("userJsonData"));
          data.id = existingData.length + 1;
          existingData.push(data);
          localStorage.setItem("userJsonData", JSON.stringify(existingData));
          // notifySuccess("Branch Added Successfully !!");
          notifySuccess("New Technician Created!");
          navigate("/technician");
          return;
        }
      } catch (error) {
        notifyError("Some error occured !!");
      }
    }
    notifySuccess('Saved !')
    console.log(data);
  };


  if(!id){
    component.pop();
    tabHeading.pop();
  }
  return (
    <>
      <MainPagetitle
        mainTitle="Technician"
        pageTitle={id?"Edit":"Create"}
        parentTitle={"Technician"}
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
export default TechnicianForm;
