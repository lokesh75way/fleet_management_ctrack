import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import MainPagetitle from "../../../../../components/MainPagetitle";
import MyAccount from "../../../../../features/branch/components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { branchAccountSchema } from "../../../../../utils/yup";
import { notifyError, notifySuccess } from "../../../../../utils/toast";
import ManagePassword from "../../../../../components/Form/ChangePassword";
import { useTranslation } from "react-i18next";
import {
  createNewBranch,
  editBranch,
} from "../../../../../services/api/BranchServices";
import { getApiErrorMessage } from "../../../../../utils/helper";

const BranchForm = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const tabHeading = [id ? t("editBranch") : t("newBranch")];
  const component = [MyAccount];
  const navigate = useNavigate();

  const totalTabs = tabHeading.length;
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userInfo: [
        {
          name: "",
          designation: "",
          mobileNumber: null,
          email: "",
        },
      ],
    },
    resolver: yupResolver(branchAccountSchema),
  });

  const onSubmit = async (data) => {
    if (activeIndex === totalTabs - 1) {
      try {
        if (data.logo == null || data.logo.length === 0) {
          delete data.logo;
        }
        if (data.file && data.file.length === 0) {
          delete data.file;
        }
        if (data.file && Object.keys(data.file).length === 0) {
          delete data.file;
        }
        if (id) {
          const Branchdata = {
            ...data,
            branchId: id,
          };

          await editBranch(Branchdata);
          notifySuccess("Branch Updated!");
          navigate("/branch");
        } else {
          await createNewBranch(data);
          notifySuccess("New Branch Created!");
          navigate("/branch");
          return;
        }
      } catch (error) {
        notifyError(getApiErrorMessage(error));
      }
    }
    // setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Branch"
        pageTitle={id ? "Edit" : "Create"}
        parentTitle={"Branch"}
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
export default BranchForm;
