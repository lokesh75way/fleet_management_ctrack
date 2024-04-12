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
import useVehicleSubmit from "../../../../../hooks/useVehicleSubmit";
import Profile from "../../../../components/TabComponent/VehicleTabs/Profile";
import General from "../../../../components/TabComponent/VehicleTabs/General";
import Document from "../../../../components/TabComponent/VehicleTabs/Document";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  vehicleDocumentSchema,
  vehicleGeneralSchema,
  vehicleProfileSchema,
} from "../../../../../yup";
import { useParams, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import { updateVehicles } from "../../../../../services/api/VehicleService";
import { createVehicles } from "../../../../../services/api/VehicleService";

const UpdateVehicleForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["General", "Profile", "Document"];
  const component = [General, Profile, Document];
  const totalTabs = tabHeading.length;
  const { formData } = location.state || {};

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
        documentType: 'INSURANCE',
        file: '',
        expireDate:  new Date(),
        issueDate:  new Date(),
      }],
    },
    resolver: yupResolver(
      activeIndex === 0
        ? vehicleGeneralSchema
        : activeIndex === 1
        ? vehicleProfileSchema
        : vehicleDocumentSchema
    ),
  });


  useEffect(()=>{
    if(id){
      formData[0].documents.map((docs,index)=>{
        setValue(`documents.${index}.documentType`,docs.documentType);
      })
    }
  },[])

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
            console.log(data)
            await updateVehicles(data, id);
            notifySuccess("Vehicle Updated Successfully");
            navigate("/vehicle");
            return;
          } catch (e) {
            notifyError("Some Error occured");
          }
        } else {
          try {
            data.businessGroupId = getValues("businessId");
            data.companyId = getValues("companyId");
            data.branchId = getValues("branchId");
            for (const key in data) {
              const element = data[key];
              if (data[key] === undefined || data[key] === "") {
                delete data[key];
              }
            }
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
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Vehicle"
        pageTitle={"Edit"}
        parentTitle={"Vehicle"}
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
export default UpdateVehicleForm;
