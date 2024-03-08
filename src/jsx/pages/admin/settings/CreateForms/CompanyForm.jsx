import React, { useState} from "react";
import { Nav,  Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../layouts/MainPagetitle";
import MyAccount from "../../../../components/TabComponent/CompanyTabs/MyAccount";
import UserSetting from "../../../../components/TabComponent/CompanyTabs/UserSetting";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyAccountSchema, companySettingSchema } from '../../../../../yup' ;
import useStorage from "../../../../../hooks/useStorage";
import {notifyError, notifySuccess} from '../../../../../utils/toast'
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const{saveData} = useStorage()
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["New Company", "Settings"];
  const component = [MyAccount, UserSetting];
  const totalTabs = tabHeading.length;
  const {register, formState:{errors}, setValue, getValues, control, handleSubmit} = useForm({
    resolver: yupResolver(activeIndex === 0 ? companyAccountSchema: companySettingSchema)
  })

  const onSubmit = (data)=>{
    if(activeIndex === (totalTabs -1)){
      try{
        saveData(data, 'companyData')
        notifySuccess("Saved !")
        navigate("/company");
        return;
      }
      catch(error){
        notifyError("Some error occured !!")
      }
    }
    // setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
    console.log(data);
    notifySuccess("Saved !")
  }
  return (
    <>
      <MainPagetitle
        mainTitle="Company"
        pageTitle={"Create"}
        parentTitle={"Company"}
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
export default CompanyForm;
