import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../layouts/MainPagetitle";
import Account from "../../components/TabComponent/SubUserTab/Account";
import { yupResolver } from "@hookform/resolvers/yup";
import {subUserAccountSchema} from '../../../yup'
import { notifyError, notifySuccess } from "../../../utils/toast";
import useStorage from "../../../hooks/useStorage";

const SubUserForm = ({ Title, editData, setEditData }) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const {checkRole,checkUserName} = useStorage()
  const role = checkRole()
  const userName = checkUserName()
  const tabHeading = ["Account"];
  const component = [Account];
  const totalTabs = tabHeading.length;
  const navigate = useNavigate()

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(subUserAccountSchema),
  });

  const onSubmit = (data) => {
    try {
      const existingData = JSON.parse(localStorage.getItem("userJsonData"));
      data.id = existingData.length + 1;
      data.role = "user";
      data.parent = userName;
      data.type = role;
      existingData.push(data);
      console.log('this is dataaaaaaaaaaaaaaaaa',data);
      localStorage.setItem("userJsonData", JSON.stringify(existingData));
      notifySuccess("User created successfully !!");
      navigate('/subUser')
    } catch (error) {
      notifyError("Error Occured !!");
      navigate('/subUser')
    }
  }
  const {id} = useParams();
  return (
    <>
      <MainPagetitle
        mainTitle="User"
        pageTitle={id?"Edit":"Create"}
        parentTitle={"User"}
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
