import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../layouts/MainPagetitle";
import Account from "../../components/TabComponent/SubUserTab/Account";
import { yupResolver } from "@hookform/resolvers/yup";
import { subUserAccountSchema, subUserEditAccountSchema } from "../../../yup";
import { notifyError, notifySuccess } from "../../../utils/toast";
import useStorage from "../../../hooks/useStorage";
import { useTranslation } from "react-i18next";
import { createUser, updateUser } from "../../../services/api/UserServices";

const SubUserForm = ({ Title, editData, setEditData }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { checkRole, checkUserName } = useStorage();
  const role = checkRole();
  const userName = checkUserName();
  const tabHeading = [t("account")];
  const component = [Account];
  const totalTabs = tabHeading.length;
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver( id ? subUserEditAccountSchema: subUserAccountSchema),
  });

  const onSubmit = async (data) => {
    if (data.businessUser) {
      data.businessGroupId = data.businessUser;
    }
    if (data.parentCompany) {
      data.companyId = data.parentCompany;
    }
    if (data.Branch) {
      console.log(data.Branch);
      data.branchId = data.Branch;
    }
    if(id){
      try {
        // data.role = "USER";
        // data.parent = userName;
        // data.type = "STAFF";
        const response = await updateUser(id,data);
        if (response.error) {
          notifyError(response.error);
        } else {
          data._id = response._id;
          notifySuccess("User updated successfully !!");
          navigate("/user");
        }
      } catch (error) {
        notifyError("Something Went Wrong");
      }
    }
    else{
      try {
        data.role = "USER";
        data.parent = userName;
        data.type = "STAFF";
        const response = await createUser(data);
        if (response.error) {
          notifyError(response.error);
        } else {
          data._id = response._id;
          notifySuccess("User created successfully !!");
          navigate("/user");
        }
      } catch (error) {
        notifyError("Something Went Wrong");
      }
    }
  };
 
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
                          formData = {formData}
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
