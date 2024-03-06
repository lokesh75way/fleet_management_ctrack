import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../layouts/MainPagetitle";
import useDriverSubmit from "../../../hooks/useDriverSubmit";
import Account from "../../components/TabComponent/SubUserTab/Account";
import { yupResolver } from "@hookform/resolvers/yup";
import {subUserAccuntSchema} from '../../../yup'

const SubUserForm = ({ Title, editData, setEditData }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["Account"];
  const component = [Account];
  const totalTabs = tabHeading.length;

  const {register, formState:{errors}, setValue, getValues, control, handleSubmit} = useForm({
    resolver: yupResolver( subUserAccuntSchema)
  })

  const onSubmit = (data)=>{
    console.log(data)
  }
  return (
    <>
      <MainPagetitle
        mainTitle="SubUser"
        pageTitle={"Create"}
        parentTitle={"SubUser"}
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
                          onSubmit={onSubmit}
                          handleSubmit={handleSubmit}
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
export default SubUserForm;
