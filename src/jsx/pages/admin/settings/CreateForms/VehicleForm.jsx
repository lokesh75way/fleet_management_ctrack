import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import Profile from "../../../../components/TabComponent/VehicleTabs/Profile";
import General from "../../../../components/TabComponent/VehicleTabs/General";
import Document from "../../../../components/TabComponent/VehicleTabs/Document";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  vehicleGeneralSchema,
  vehicleProfileSchema,
  vehicleDocumentSchema,
} from "../../../../../yup";
import useStorage from "../../../../../hooks/useStorage";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import {
  createVehicles,
  updateVehicles,
} from "../../../../../services/api/VehicleService";

import { useTranslation } from "react-i18next";

const VehicleForm = () => {
  const { t } = useTranslation();
  const { saveData } = useStorage();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = [t("general"), t("profile"), t("document")];
  const component = [General, Profile, Document];
  const totalTabs = tabHeading.length;

  const { id } = useParams();
  const location = useLocation();
  const { formData, vehicle } = location.state || {};

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
      defaultValues: {
        documents: [{
          documentType: {label : 'INSURANCE' , value : 'INSURANCE'},
          file: '',
          expireDate:  new Date(),
          issueDate:  new Date(),
        }],
        vehicleName: vehicle?.Vehicle_Name,
        imeiNumber: vehicle?.imeiNumber,
        plateNumber: vehicle?.Vehicle_No,
        registrationNumber: vehicle?.Vehicle_No,
      },
    resolver: yupResolver(
      activeIndex === 0
        ? vehicleGeneralSchema
        : activeIndex === 1
        ? vehicleProfileSchema
        : vehicleDocumentSchema
    ),
  });


  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        if (id) {
          try {
            data.businessGroupName = getValues("businessGroupName");
            for (const key in data) {
              const element = data[key];
              if (data[key] === undefined || data[key] === "") {
                delete data[key];
              }}
            await updateVehicles(data);
            notifySuccess("Vehicle Updated Successfully");
            navigate("/vehicle");
            return;
          } catch (e) {
            notifyError("Some Error occured");
          }
        } else {
          try {
            for (const key in data) {
              const element = data[key];
              if (data[key] === undefined || data[key] === "") {
                delete data[key];
              }
            }
            delete data.test;
            data.businessGroupId = getValues("businessId");
            data.companyId = getValues("companyId");
            data.branchId = getValues("branchId");
            await createVehicles(data);
            notifySuccess("Vehicle created");
            navigate("/vehicle");
            return;
          } catch (e) {
            notifyError("Some error occured");
          }
        }
      } catch (error) {
        notifyError("Some error occured");
      }
      return;
    }
    setActiveIndex((prevIndex) => {
      return Math.min(prevIndex + 1, totalTabs - 1);
    });
  };
  return (
    <>
      <MainPagetitle
        mainTitle={t("vehicle")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("vehicle")}
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
                          handleSubmit={handleSubmit}
                          onSubmit={onSubmit}
                          formData={formData}
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
