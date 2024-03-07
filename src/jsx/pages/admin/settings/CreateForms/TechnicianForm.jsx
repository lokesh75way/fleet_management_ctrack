import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, use } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import General from "../../../../components/TabComponent/TecnicianTab/General";
import Address from "../../../../components/TabComponent/TecnicianTab/Address";
import Leave from "../../../../components/TabComponent/TecnicianTab/Leave";
import { yupResolver } from "@hookform/resolvers/yup";
import {technicianGeneralSchema,technicianAddressSchema,technicianLeaveSchema} from '../../../../../yup'

const TechnicianForm = ({ Title, editData, setEditData }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["General", "Address", "Leave"];
  const component = [General, Address, Leave];
  const totalTabs = tabHeading.length;

  const {register, formState:{errors}, setValue, getValues, control, handleSubmit} = useForm({
    resolver: yupResolver(activeIndex === 0 ? technicianGeneralSchema: activeIndex === 1 ? technicianAddressSchema:technicianLeaveSchema)
  })

  const onSubmit = (data)=>{
    if(activeIndex === (totalTabs -1)){
      const existingData = JSON.parse(localStorage.getItem('technicianData'));
      data.id  = existingData.length + 1;
      existingData.push(data)
      localStorage.setItem('technicianData',JSON.stringify(existingData))
      return;
    }
    console.log(data)
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));

  }
  return (
    <>
      <MainPagetitle
        mainTitle="Technician"
        pageTitle={"Create"}
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
