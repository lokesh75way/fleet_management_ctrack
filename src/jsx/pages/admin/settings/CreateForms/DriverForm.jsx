import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import Profile from "../../../../components/TabComponent/DriverTabs/Profile";
import AdditionalInfo from "../../../../components/TabComponent/DriverTabs/AdditionalInfo";
import Document from "../../../../components/TabComponent/DriverTabs/Document";
import { yupResolver } from "@hookform/resolvers/yup";
import { driverProfileSchema, driverInfoSchema } from '../../../../../yup' ;

const DriverForm = () => {
 const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["Profile", "Additional Info", "Document"];
  const component = [Profile, AdditionalInfo, Document];
  const totalTabs = tabHeading.length;

  const {register, formState:{errors}, setValue, getValues, control, handleSubmit} = useForm({
    resolver: yupResolver(activeIndex === 0 ? driverProfileSchema: driverInfoSchema)
  })


  const onSubmit = (data)=>{
    if(activeIndex === (totalTabs -1)){
      const existingData = JSON.parse(localStorage.getItem('driverData'));
      console.log(existingData);
      data.id  = existingData.length  + 1;
      existingData.push(data)
      localStorage.setItem('driverData',JSON.stringify(existingData))
      navigate('/Driver')
      return;
    }
    console.log(data)
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  }
  return (
    <>
      <MainPagetitle
        mainTitle="Driver"
        pageTitle={"Create"}
        parentTitle={"Driver"}
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
export default DriverForm;
