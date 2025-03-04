import React, { useState, useEffect } from "react";
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
  driverDocumentSchema,
} from "../../../../../utils/yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  createDriver,
  getDriverById,
  updateDriver,
} from "../../../../../services/api/driverService";
import { driverDocumentOptions } from "@/constants/options";

const DriverForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = [t("profile"), t("additionalInfo"), t("document")];
  const component = [Profile, AdditionalInfo, Document];
  const totalTabs = tabHeading.length;
  const { id: driverId } = useParams();
  const [editData, setEditData] = useState({});

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(
      activeIndex === 0
        ? driverProfileSchema
        : activeIndex === 1
          ? driverInfoSchema
          : driverDocumentSchema
    ),
  });

  const onSubmitHanlder = async (data) => {
    try {
      if (activeIndex === totalTabs - 1) {
        if(data?.documents?.length <=0 ) {
          notifyError(t("Please add atleast one document"));
          return;
        }
        const issueDate = new Date(data.documents[0].issueDate);
        const expireDate = new Date(data.documents[0].expireDate);    
        // Check if issueDate and expireDate are valid dates
        if (isNaN(issueDate.getTime()) || isNaN(expireDate.getTime())) {
          throw new Error("Invalid date format");
        }

        // Convert issueDate and expireDate to ISO strings
        const formattedIssueDate = issueDate.toISOString();
        const formattedExpireDate = expireDate.toISOString();
        if (driverId) {
          const result = await updateDriver(driverId, {
            ...data,
            documents: data?.documents?.map((doc) => ({
              ...doc,
              issueDate: new Date(doc.issueDate).toISOString(),
              expireDate: new Date(doc.expireDate).toISOString(),
            })),
          });
          notifySuccess("Driver Updated!");
          navigate("/driver");
        } else {
          const result = await createDriver({
            ...data,
            documents: data?.documents?.map((doc) => ({
              ...doc,
              issueDate: new Date(doc.issueDate).toISOString(),
              expireDate: new Date(doc.expireDate).toISOString(),
            })),
          });
          notifySuccess(t("newDriverCreated"));
          navigate("/driver");
        }
      } else {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
      }
    } catch (error) {
      console.log("Error in Driver form(create new Driver): ", error);
      if(error?.response?.data?.error_code===400) {
        notifyError(t("Please add all required fields"));
      }else if(error?.response?.data?.error_code===401) {
        notifyError(t("Unauthorised access"));
      }else if(error?.status!==500) {
        notifyError(t("Please add all required fields"));
      }else{
        notifyError(t("someErrorOccurred"));
      }
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("driver")}
        pageTitle={driverId ? t("edit") : t("create")}
        parentTitle={t("driver")}
      />
      <div className="m-2 p-2">
        <FormProvider>
          <form onSubmit={handleSubmit(onSubmitHanlder)}>
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
                          onSubmit={onSubmitHanlder}
                          watch={watch}
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
