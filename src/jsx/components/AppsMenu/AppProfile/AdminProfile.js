import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Button, Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../components/MainPagetitle";
import MyAccount from "../../../components/TabComponent/AdminProfileTabs/MyProfile";
import { yupResolver } from "@hookform/resolvers/yup";
import { adminProfileAccountSchema } from "../../../../utils/yup";
import useStorage from "../../../../hooks/useStorage";
import { notifySuccess } from "../../../../utils/toast";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { checkRole } = useStorage();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["My Profile"];
  const component = [MyAccount];
  const totalTabs = tabHeading.length;
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const allData = JSON.parse(localStorage.getItem("userJsonData"));
  const editData = allData?.find((data) => data.role === "admin");

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(adminProfileAccountSchema),
  });

  const onSubmit = (data) => {
    const val = JSON.parse(localStorage.getItem("userJsonData"));

    const indexToUpdate = val.findIndex((item) => item.id == editData.id);
    if (indexToUpdate !== -1) {
      val[indexToUpdate] = {
        ...data,
        id: editData.id,
        email: editData.email,
        role: "admin",
        whatsappContactNumber: editData.whatsappContactNumber,
      };
      localStorage.setItem("userJsonData", JSON.stringify(val));
      notifySuccess("Profile Updated!");
      navigate("/");
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle="My Profile"
        pageTitle={"my-profile / create"}
        parentTitle={"Manage Profile"}
      />
      <div className="m-2 p-2">
        <Button
          onClick={() => setIsEdit(!isEdit)}
          style={{ marginLeft: "auto", display: "flex" }}
        >
          Edit
        </Button>
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
                          data={editData}
                          control={control}
                          setValue={setValue}
                          register={register}
                          getValues={getValues}
                          errors={errors}
                          isEdit={isEdit}
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
export default AdminProfile;
