import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import MainPagetitle from "@/components/MainPagetitle";
import Profile from "../components/Forms/Profile";
import AdditionalInfo from "../components/Forms/AdditionalInfo";
import Document from "../components/Forms/Document";
import {
  driverProfileSchema,
  driverInfoSchema,
  driverDocumentSchema,
} from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createDriver, getDriverById, updateDriver } from "../api";
import { getApiErrorMessage } from "@/utils/helper";
import Loader from "@/components/Loader";

const CreateDriver = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = [t("profile"), t("additionalInfo"), t("document")];
  const component = [Profile, AdditionalInfo, Document];
  const totalTabs = tabHeading.length;
  const { id: driverId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: driverData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["driver", driverId],
    queryFn: () => getDriverById(driverId),
    enabled: !!driverId,
    staleTime: Infinity,
  });

  const parsedDriverData = useMemo(() => {
    return {
      ...driverData,
      businessGroupId: driverData?.businessGroupId?._id,
      companyId: driverData?.companyId?._id,
      branchId: driverData?.branchId?._id,
    };
  }, [driverData]);

  useEffect(() => {
    if (isError && !!driverId) {
      notifyError("Not able to fetch driver data");
      navigate("/not-found");
    }
  }, [isError && driverId]);

  const validationSchema = useCallback((index) => {
    switch (index) {
      case 0:
        return driverProfileSchema;
      case 1:
        return driverInfoSchema;
      case 2:
        return driverDocumentSchema;
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
    resolver: yupResolver(validationSchema(activeIndex)),
    values: parsedDriverData,
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));
  const { mutate: createDriverMutation, isPending: createPending } =
    useMutation({
      mutationFn: createDriver,
      onSuccess: () => {
        notifySuccess("New Driver Created");
        queryClient.invalidateQueries(["drivers"]);
        navigate("/driver");
      },
      onError,
    });
  const { mutate: editDriverMutation, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => updateDriver(id, data),
    onSuccess: () => {
      notifySuccess("Driver Updated Successfully");
      queryClient.invalidateQueries(["drivers"]);
      navigate("/driver");
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
        return false;
      }
    }
    return true;
  };

  const onSubmitHanlder = async (data) => {
    if (activeIndex === totalTabs - 1) {
      const isValid = validateAllFields(data);
      if (!isValid) return;

      if (driverId) {
        editDriverMutation({
          id: driverId,
          data,
        });
      } else {
        createDriverMutation(data);
      }
    } else {
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
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
                            onSubmit={onSubmitHanlder}
                            isFormSubmitting={editPending || createPending}
                            watch={watch}
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
export default CreateDriver;
