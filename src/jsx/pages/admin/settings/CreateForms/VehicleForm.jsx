import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../../components/MainPagetitle";
import Profile from "../../../../components/TabComponent/VehicleTabs/Profile";
import General from "../../../../components/TabComponent/VehicleTabs/General";
import Document from "../../../../components/TabComponent/VehicleTabs/Document";
import Information from "../../../../components/TabComponent/VehicleTabs/Information";
import Licensing from "../../../../components/TabComponent/VehicleTabs/Licensing";
import Servicing from "../../../../components/TabComponent/VehicleTabs/Servicing";
import Statuses from "../../../../components/TabComponent/VehicleTabs/Statuses";
import MessageForwarding from "../../../../components/TabComponent/VehicleTabs/MessageForwarding";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  vehicleGeneralSchema,
  vehicleProfileSchema,
  vehicleDocumentSchema,
  vehicleInformationSchema,
} from "../../../../../utils/yup";
import useStorage from "../../../../../hooks/useStorage";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import {
  createVehicles,
  getVehicleById,
  updateVehicles,
} from "../../../../../services/api/VehicleService";

import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";

const VehicleForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState();
  const { id } = useParams();
  const tabHeading = [
    t("information"),
    t("general"),
    t("licensing"),
    // t("servicing"),
    // t("statuses"),

    t("profile"),
    // t("document"),
    // t("messageforwarding"),
  ];

  const component = [
    Information,
    General,
    Licensing,
    // Servicing,
    // Statuses,
    Profile,
    // Document,
    // MessageForwarding,
  ];

  const totalTabs = tabHeading.length;
  const location = useLocation();
  const {
    // formData,
    vehicle,
  } = location.state || {};

  const { data, isError } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError && !!id) {
      notifyError("Not able to fetch business group data");
      navigate("/not-found");
    }
  }, [isError && id]);

  useEffect(() => {
    if (id && data) {
      setFormData(data?.data);
    }
  }, [data]);

  console.log("data", formData);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      documents: [
        {
          documentType: { label: "INSURANCE", value: "INSURANCE" },
          file: "",
          expireDate: new Date(),
          issueDate: new Date(),
        },
      ],
      // vehicleName: vehicle?.Vehicle_Name,
      // imeiNumber: vehicle?.imeiNumber,
      // plateNumber: vehicle?.Vehicle_No,
      // registrationNumber: vehicle?.Vehicle_No,
      selectedInput: "registrationNumber",
    },
    resolver: yupResolver(
      activeIndex === 0
        ? vehicleInformationSchema
        : activeIndex === 1
          ? vehicleGeneralSchema
          : activeIndex === 3
            ? vehicleProfileSchema
            : activeIndex === 2
              ? yup.object()
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
              }
            }
            await updateVehicles(data);
            notifySuccess("Vehicle Updated Successfully");
            navigate("/vehicle");
            return;
          } catch (e) {
            notifyError("Some Error occured");
          }
        } else {
          console.log("data", data);
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
export default VehicleForm;
