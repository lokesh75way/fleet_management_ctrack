import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import Profile from "../../../../components/TabComponent/DriverTabs/Profile";
import AdditionalInfo from "../../../../components/TabComponent/DriverTabs/AdditionalInfo";
import Document from "../../../../components/TabComponent/DriverTabs/Document";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  driverProfileSchema,
  driverInfoSchema,
  driverDocumentSchema,
} from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  createDriver,
  getDriverById,
  updateDriver,
} from "../../../../../services/api/driverService";

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
  } = useForm({
    defaultValues: editData,
    resolver: yupResolver(
      activeIndex === 0
        ? driverProfileSchema
        : activeIndex === 1
        ? driverInfoSchema
        : driverDocumentSchema
    ),
  });

  async function getDriver(driverId) {
    try {
      const data = await getDriverById(driverId);
      setEditData(data);
      reset(data);
    } catch (error) {
      notifyError("Some error occured !!");
      navigate("/driver");
    }
  }
  console.log(errors, 'erro0rs-:', getValues())
  useEffect(() => {
    if (driverId) getDriver(driverId);
  }, [driverId]);

  const onSubmitHanlder = async (data) => {
    console.log({ data });
    try {
        if (activeIndex === totalTabs - 2) {
            if (driverId) {
                await updateDriver(driverId, data);
                notifySuccess("Driver Updated!");
                navigate("/driver");
            } else {
                await createDriver(data);
                notifySuccess(t("newDriverCreated"));
                navigate("/driver");
            }
        } else {
            setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
        }
    } catch (error) {
        notifyError(t("someErrorOccurred"));
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
