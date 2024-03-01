import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import useVehicleSubmit from "../../../../../hooks/useVehicleSubmit";
import Profile from "../../../../components/TabComponent/VehicleTabs/Profile";
import Sensors from "../../../../components/TabComponent/VehicleTabs/Sensor";
import General from "../../../../components/TabComponent/VehicleTabs/General";
import Camera from "../../../../components/TabComponent/VehicleTabs/Camera";
import Document from "../../../../components/TabComponent/VehicleTabs/Document";
import { Link } from "react-router-dom";

const VehicleForm = ({ Title, editData, setEditData }) => {
  const {
    onSubmit,
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useVehicleSubmit();

  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["General", "Profile", "Document"];
  const component = [General, Camera, Document];
  const totalTabs = tabHeading.length;
  const handleNext = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1)); // Increment active tab index
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Vehicle"
        pageTitle={"Create"}
        parentTitle={"Vehicle"}
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
                          register={register}
                          setValue={setValue}
                          getValues={getValues}
                          control={control}
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
export default VehicleForm;
