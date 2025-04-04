import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  technicianAddressSchema,
  technicianGeneralSchema,
  technicianLeaveSchema,
} from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { getApiErrorMessage } from "@/utils/helper";
import { createTechnician, getTechnicianById, updateTechnician } from "../api";
import MainPagetitle from "@/components/MainPagetitle";
import General from "../components/Form/General";
import Address from "../components/Form/Address";
import Leave from "../components/Form/Leave";
import Loader from "@/components/Loader";

const leaveArr = [
  {
    leaveType: "CASUAL",
    days: "",
  },
  {
    leaveType: "SICK",
    days: "",
  },
  {
    leaveType: "PRIVILEGE",
    days: "",
  },
];

const CreateTechnician = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = [t("general"), t("address"), t("leave")];
  const component = [General, Address, Leave];
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: technicianData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["technician", id],
    queryFn: () => getTechnicianById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  const parsedTechnicianData = useMemo(() => {
    if (technicianData)
      return {
        ...technicianData,
        leave: technicianData.leave.length ? technicianData.leave : leaveArr,
      };
  }, [technicianData]);

  useEffect(() => {
    if (isError && !!id) {
      notifyError("Not able to fetch technician data");
      navigate("/not-found");
    }
  }, [isError && id]);

  const onError = (err) => notifyError(getApiErrorMessage(err));

  const { mutate: editTechniciaMutation, isPending: editPending } = useMutation(
    {
      mutationFn: ({ data, id }) => updateTechnician(data, id),
      onSuccess: () => {
        notifySuccess("Technician Updated Successfully");
        queryClient.invalidateQueries(["technicians"]);
        queryClient.invalidateQueries(["technician", id]);
        navigate("/technician");
      },
      onError,
    }
  );

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      leave: leaveArr,
    },
    resolver: yupResolver(
      activeIndex === 0
        ? technicianGeneralSchema
        : activeIndex === 1
          ? technicianAddressSchema
          : technicianLeaveSchema
    ),
    values: parsedTechnicianData,
  });

  const { mutate: createTechnicianMutation, isPending: createPending } =
    useMutation({
      mutationFn: createTechnician,
      onSuccess: () => {
        notifySuccess("New Technician Created");
        queryClient.invalidateQueries(["technicians"]);
        navigate("/technician");
      },
      onError,
    });

  const onSubmit = (data) => {
    if (activeIndex === tabHeading.length - 1) {
      if (id) {
        editTechniciaMutation({ id, data });
      } else {
        createTechnicianMutation(data);
      }
      return;
    }
    setActiveIndex((prevIndex) =>
      Math.min(prevIndex + 1, tabHeading.length - 1)
    );
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("technician")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("technician")}
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
                  {isLoading ? (
                    <Loader height={500} />
                  ) : (
                    tabHeading.map((data, i) => {
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
                            isFormSubmitting={
                              createPending || editPending || isLoading
                            }
                          />
                        </Tab.Pane>
                      );
                    })
                  )}
                </Tab.Content>
              </Tab.Container>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default CreateTechnician;
