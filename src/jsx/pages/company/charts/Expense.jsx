import React from "react";
import MainPagetitle from "../../../../components/MainPagetitle";
import Tabs from "../../../components/Tabs";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiTimer } from "react-icons/ci";
import ChartComponent from "../../../components/company/charts/ChartComponent";

const Expense = () => {
  const data = [
    {
      title: "Cost Distribution",
      component: <ChartComponent />,
      icon: <GiTakeMyMoney />,
    },
    {
      title: "Cost By Time",
      component: <ChartComponent />,
      icon: <CiTimer />,
    },
  ];
  return (
    <>
      <MainPagetitle
        mainTitle="Expense"
        pageTitle={"Expense"}
        parentTitle={"Charts"}
      />
      <Tabs tabs={data} />
    </>
  );
};

export default Expense;
