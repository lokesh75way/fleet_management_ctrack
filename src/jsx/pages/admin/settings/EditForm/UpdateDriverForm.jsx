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
import MainPagetitle from "../../../../../components/MainPagetitle";
import Profile from "../../../../components/TabComponent/DriverTabs/Profile";
import AdditionalInfo from "../../../../components/TabComponent/DriverTabs/AdditionalInfo";
import Document from "../../../../components/TabComponent/DriverTabs/Document";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  driverProfileSchema,
  driverInfoSchema,
} from "../../../../../utils/yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import "@/assets/scss/pages/_driver-tracking.scss";

const UpdateDriverForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["Profile", "Additional Info", "Document"];
  const component = [Profile, AdditionalInfo, Document];
  const totalTabs = tabHeading.length;
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({});

  const onSubmit = (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        if (id) {
          const val = JSON.parse(localStorage.getItem("userJsonData"));
          console.log(id);
          const indexToUpdate = val.findIndex((item) => item.id == id);
          if (indexToUpdate !== -1) {
            val[indexToUpdate] = {
              ...data,
              id,
              designation: "driver",
              role: "user",
            };
            localStorage.setItem("userJsonData", JSON.stringify(val));
            notifySuccess("Driver Updated!");
            // navigate("/driver");
          }
          return;
        } else {
          data = { ...data, designation: "driver", role: "user" };
          const existingData = JSON.parse(localStorage.getItem("userJsonData"));
          data.id = existingData.length + 1;
          existingData.push(data);
          localStorage.setItem("userJsonData", JSON.stringify(existingData));
          // notifySuccess("Branch Added Successfully !!");
          notifySuccess("New Driver Created!");
          navigate("/driver");
          return;
        }
      } catch (error) {
        notifyError("Some error occured !!");
      }
    }
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };
  return (
    <>
      <MainPagetitle
        mainTitle="Driver"
        pageTitle={"Edit"}
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
export default UpdateDriverForm;
