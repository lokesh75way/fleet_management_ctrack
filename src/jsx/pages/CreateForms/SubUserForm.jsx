import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../layouts/MainPagetitle";
import Account from "../../components/TabComponent/SubUserTab/Account";
import { yupResolver } from "@hookform/resolvers/yup";
import { subUserAccountSchema } from '../../../yup'
import { notifyError, notifySuccess } from "../../../utils/toast";
import useStorage from "../../../hooks/useStorage";
import { useTranslation } from 'react-i18next'
import { createUser, updateUser } from '../../../services/api/UserServices'

const SubUserForm = ({ Title, editData, setEditData }) => {

  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { checkRole, checkUserName } = useStorage()
  const role = checkRole()
  const userName = checkUserName()
  const tabHeading = [t('account')];
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

  const onSubmit = async (data) => {
    console.log(data, 'this is data')
    if (data.hasOwnProperty('_id') && data._id) {

      try {
        const existingData = JSON.parse(localStorage.getItem("userJsonData"));
        const index = existingData.findIndex((item) => item._id === data._id);
        //only update fieds that changed on index

        existingData[index] = { ...existingData[index], ...data };
        const response = await updateUser(data, data._id)
        console.log('this is updateResponse', response)
        if (response.error) {
          notifyError(response.error);
        } else {
          localStorage.setItem("userJsonData", JSON.stringify(existingData));
          notifySuccess("User updated successfully !!");
          navigate('/subUser')
        }
          // UserServices.updateuser(data, data._id)
          // .then(response => {
          //   if(response?.data?.success === true){
          //     localStorage.setItem("userJsonData", JSON.stringify(existingData));
          //     notifySuccess("User updated successfully !!");
          //     navigate('/subUser')
          //   }else{
          //     notifyError(response?.message?.message)
          //   }
          // }).catch(error => {
          //   notifyError(error?.message?.message);
          // })
        } catch (error) {
          notifyError("Error Occured !!");
        }
      }else {
        try {
          const existingData = JSON.parse(localStorage.getItem("userJsonData"));
          // data.id = existingData.length + 1;
          data.role = "user";
          data.parent = userName;
          data.type = "admin";
          const response = await createUser(data)
          console.log('this is response', response)
          if (response.error) {
            notifyError(response.error);
          } else {
            data._id = response._id
            existingData.push(data);
            localStorage.setItem("userJsonData", JSON.stringify(existingData));
            notifySuccess("User created successfully !!");
            navigate('/subUser')
          }

          // UserServices.createUser(data)
          // .then(response => {
          //   if(response?.data?.success === true){
          //   console.log('this is response',response)
          //   data._id = response.data.data._id
          //   existingData.push(data);
          //   localStorage.setItem("userJsonData", JSON.stringify(existingData));
          //   notifySuccess("User created successfully !!");
          //   navigate('/subUser')
          //   }else{
          //     notifyError(response?.message?.message)
          //   }
          // }).catch(error => {
          //   notifyError(error?.message?.message);
          // })

        } catch (error) {
          notifyError("Something Went Wrong");
        }
      }
    }
    const { id } = useParams();
    return (
      <>
        <MainPagetitle
          mainTitle="User"
          pageTitle={id ? "Edit" : "Create"}
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
