import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseSchema } from "../../../utils/yup";

import SettingExpense from "./SettingExpense";
import MainPagetitle from "../../../components/MainPagetitle";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  createExpense,
  updateExpense,
} from "../../../services/api/ExpenseServices";
import { notifyError, notifySuccess } from "../../../utils/toast";

const ExpenseForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = ["Expense"]; // Change the tab heading to "Expense"
  const component = [SettingExpense]; // Use the Expense component for all tabs
  const { t } = useTranslation();
  const { id } = useParams();
  const totalTabs = tabHeading.length;
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(expenseSchema), // Use the expense schema for form validation
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (id) {
      try {
        // if (data.bill.length === 0) {
        //   delete data.bill;
        // }
        // if(data.file.length === 0){
        //   delete data.file;
        // }
        await updateExpense(id, data);
        notifySuccess("Expense Updated!");
        navigate("/settings/expense");
      } catch (e) {
        console.log(e);
        notifyError("Some error occured !!");
      }
    } else {
      try {
        if (data.bill.length === 0) {
          delete data.bill;
        }
        await createExpense(data);
        notifySuccess(t("New Expense Created"));
        navigate("/settings/expense");
      } catch (error) {
        console.log(error);
        notifyError("Some error occured !!");
      }
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle={t("expense")}
        pageTitle={id ? t("edit") : t("create")}
        parentTitle={t("expense")}
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

export default ExpenseForm;
