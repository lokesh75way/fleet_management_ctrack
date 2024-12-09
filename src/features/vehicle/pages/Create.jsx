import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import Profile from "../components/Forms/Profile";
import General from "../components/Forms/General";
import Document from "../components/Forms/Document";
import Information from "../components/Forms/Information";
import Licensing from "../components/Forms/Licensing";
import {
  vehicleGeneralSchema,
  vehicleProfileSchema,
  vehicleDocumentSchema,
  vehicleInformationSchema,
  vehicleLicenseSchema,
} from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createVehicles, updateVehicles, getVehicleById } from "../api";
import { getApiErrorMessage } from "@/utils/helper";

const CreateVehicle = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id: vehicleId } = useParams();
  const tabHeading = [
    t("information"),
    t("general"),
    t("licensing"),
    t("profile"),
    t("document"),
  ];
  let component = [Information, General, Licensing, Profile, Document];
  const totalTabs = tabHeading.length;
  const queryClient = useQueryClient();

  const {
    data: vehicleData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => getVehicleById(vehicleId),
    enabled: !!vehicleId,
    staleTime: Infinity,
  });

  const parsedVehicleData = useMemo(() => {
    return {
      ...vehicleData,
      selectedInput: vehicleData?.fleetnumber
        ? "fleetnumber"
        : "registrationNumber",
      branchId: vehicleData?.branchId?._id,
    };
  }, [vehicleData]);

  useEffect(() => {
    if (isError && !!vehicleId) {
      notifyError("Not able to fetch vehicle data");
      navigate("/not-found");
    }
  }, [isError && vehicleId]);

  const validationSchema = useCallback((index) => {
    switch (index) {
      case 0:
        return vehicleInformationSchema;
      case 1:
        return vehicleGeneralSchema;
      case 2:
        return vehicleLicenseSchema;
      case 3:
        return vehicleProfileSchema;
      case 4:
        return vehicleDocumentSchema;
    }
  }, []);

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
      selectedInput: "registrationNumber",
    },
    resolver: yupResolver(validationSchema(activeIndex)),
    values: parsedVehicleData,
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));
  const { mutate: createVehicle, isPending: createPending } = useMutation({
    mutationFn: createVehicles,
    onSuccess: () => {
      notifySuccess("New Vehicle Created");
      queryClient.invalidateQueries(["vehicles"]);
      navigate("/vehicle");
    },
    onError,
  });
  const { mutate: editVeicle, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => updateVehicles(data, id),
    onSuccess: () => {
      notifySuccess("Vehicle Updated Successfully");
      queryClient.invalidateQueries(["vehicles"]);
      navigate("/vehicle");
    },
    onError,
  });

  const validateAllFields = async (data) => {
    for (let i = 0; i < totalTabs; i++) {
      const schema = validationSchema(i);
      try {
        await schema.validate(data);
      } catch (err) {
        notifyError("Please check all the fields are filled");
        break;
      }
    }
  };

  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - 1) {
      validateAllFields(data);
      if (vehicleId) {
        for (const key in data) {
          if (data[key] === undefined || data[key] === "") {
            delete data[key];
          }
        }
        editVeicle({ data, vehicleId });
      } else {
        for (const key in data) {
          if (data[key] === undefined || data[key] === "") {
            delete data[key];
          }
        }
        delete data.test;
        createVehicle(data);
      }
    } else {
      setActiveIndex((prevIndex) => {
        return Math.min(prevIndex + 1, totalTabs - 1);
      });
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("vehicle")}
        pageTitle={vehicleId ? t("edit") : t("create")}
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
                          watch={watch}
                          isLoading={createPending || editPending}
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
export default CreateVehicle;
