import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Trip from "./Trip";
import { classifyTripsSchema } from "../../../utils/yup";
import {
  createTrip,
  updateTrip,
} from "../../../services/api/ClassifyTripServices";
import { notifyError, notifySuccess } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import MainPagetitle from "../../../components/MainPagetitle";
import { useTranslation } from "react-i18next";

const ClassifyTripForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabHeading = [t("trip")]; // Change the tab heading to "Trip"
  const component = [Trip]; // Use the Trip component for all tabs

  const totalTabs = tabHeading.length;
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(classifyTripsSchema),
  });

  const { id } = useParams();
    const onSubmit = async (data) => {
    if (id) {
      try {
        await updateTrip(id, data);
        notifySuccess("Trip Updated!");
        navigate("/settings/classifyTrips");
        return;
      } catch (e) {
        console.log(e);
        notifyError("Some error occured !!");
      }
    } else {
      try {
        await createTrip(data);
        notifySuccess("New Trip Created!");
        navigate("/settings/classifyTrips");
        console.log("Submit botn", data);
      } catch (error) {
        console.log("Error", error);
        notifyError("Some error occured !!");
      }
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("trip")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("classifyTrip")}
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

export default ClassifyTripForm;
