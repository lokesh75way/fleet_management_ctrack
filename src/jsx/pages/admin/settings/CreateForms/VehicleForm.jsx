import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FormProvider } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import useVehicleSubmit from "../../../../../hooks/useVehicleSubmit";
import Profile from '../../../../components/TabComponent/VehicleTabs/Profile'
import Sensors from '../../../../components/TabComponent/VehicleTabs/Sensor'
import General from '../../../../components/TabComponent/VehicleTabs/General'
import Camera from '../../../../components/TabComponent/VehicleTabs/Camera'
import Document from '../../../../components/TabComponent/VehicleTabs/Document'

const VehicleForm = ({ Title, editData, setEditData }) => {
  const {
    register,
    onSubmit,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useVehicleSubmit();

  const [startDate, setStartDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [addEmploye, setAddEmploye] = useState(false);

  const nav = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const tabHeading = [ "General", "Profile" , "Sensors" , "Camera" , "Document" ];
  const component = [ General, Profile , Sensors , Camera , Document ];
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
                    >
                      {data}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content className="pt-4">
                {tabHeading.map((data, i) => {
                    const Component = component[i]
                  return (<Tab.Pane eventKey={data.toLowerCase()} key={i}>
                    <Component data={tabHeading} />
                  </Tab.Pane>)
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
