import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import General from "../../../../components/TabComponent/TecnicianTab/General";
import Address from "../../../../components/TabComponent/TecnicianTab/Address";
import Leave from "../../../../components/TabComponent/TecnicianTab/Leave";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  technicianGeneralSchema,
  technicianAddressSchema,
  technicianLeaveSchema,
} from "../../../../../yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { useTranslation } from "react-i18next";
import {
  createTechnician,
  getTechnicianById,
  updateTechnician,
} from "../../../../../services/api/TechnicianService";

const TechnicianForm = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const tabHeading = [t("general"), t("address"), t("leave")];
  const component = [General, Address, Leave];
  const totalTabs = tabHeading.length;
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
        ? technicianGeneralSchema
        : activeIndex === 1
        ? technicianAddressSchema
        : technicianLeaveSchema
    ),
  });
  const { id: techId } = useParams();
  console.log(errors, "error:-", getValues())
  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        if (techId) {
          console.log(data)
          await updateTechnician(data, techId);
          notifySuccess("Technincian updated!");
          navigate("/technician/details");
          return;
        } else {
          await createTechnician(data);
          notifySuccess("Technician created");
          navigate("/technician/details");
          return;
        }
      } catch (error) {
        const validationErr = error.response?.data?.data?.errors;
        if (validationErr && validationErr.length > 0) {
          notifyError(validationErr[0].msg);
        } else notifyError(t("someErrorOccurred"));
        return;
      }
    }
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };

  async function getTechnician(id) {
    try {
      const data = await getTechnicianById(id);
      setEditData(data);
      console.log(data, "techdata")
      setValue('noOfDaysCL',data.leave[0].days)
      setValue('noOfDays',data.leave[1].days)
      setValue('noOfDaysPL',data.leave[2].days)
      reset(data);
    } catch (error) {
      notifyError("Some error occured !!");
      navigate("/technician/details");
    }
  }

  useEffect(() => {
    if (techId) {
     getTechnician(techId)
     
    };
  }, [techId]);
  return (
    <>
      <MainPagetitle
        mainTitle={t("technician")}
        pageTitle={techId ? t("edit") : t("create")}
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
export default TechnicianForm;
