import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import InviteCustomer from "../constant/ModalList";
import { ExpenseData } from "../components/Tables/Tables";
import ExpenseTable from "../components/Tables/ExpenseTable";
import ExpenseOffcanvas from "../constant/ExpenseOffcanvas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {expenseSchema} from '../../yup'

import {useTranslation} from 'react-i18next'

const headers = [
  { label: "Employee ID", key: "emplid" },
  { label: "Employee Name", key: "title" },
  { label: "Department", key: "department" },
  { label: "Email Address", key: "email" },
  { label: "Contact Number", key: "contact" },
  { label: "Gender", key: "gender" },
  { label: "Location", key: "location" },
  { label: "Status", key: "status" },
];

const Driver = (ref) => {

  const {t} = useTranslation();
  const [tableData, setTableData] = useState(ExpenseData);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(
        expenseSchema
    ),
  });
  const [editData, setEditData] = useState({
    id: 0,
    status: "",
    title: "",
    contact: 0,
    age: 0,
    drivingExperience: 0,
    gender: "",
    location: "",
  });
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  // const[formData, setFormData] = useState()

  useEffect(() => {
    setData(document.querySelectorAll("#employee-tbl_wrapper tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));

    // setEditTableData(item);
    expense.current.showModal();
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  // const handleSubmit=(e)=>{
  //     e.preventDefault();
  //     const updateTable = tableData.map((table)=>{
  //         if(table.id === editData.id) {
  //             console.log(table.id)
  //             return {...table, ...editData };
  //         }
  //         return table;
  //     })
  //     setTableData(updateTable)
  // }

  const expense = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t('expense')}
        pageTitle={t('expense')}
        parentTitle={t('settings')}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('expense')}</h4>
                    <div>
                      <Link
                        to={"#"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        onClick={() => {expense.current.showModal(); console.log(expense)}}
                      >
                        + {t('addExpense')}
                      </Link>{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table
                      id="empoloyees-tblwrapper"
                      className="table ItemsCheckboxSec dataTable no-footer mb-0"
                    >
                      <thead>
                        <tr>
                          <th>{t('id')}</th>
                          <th>{t('vehicleName')}</th>
                          <th>{t('expenseDate')}</th>
                          <th>{t('amount')}</th>
                          <th>{t('description')}</th>
                          <th>{t('action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <ExpenseTable
                          editData={editData}
                          tableData={tableData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                          setEditData={setEditData}
                        />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                      {t('showing')} {activePag.current * sort + 1} {t('to')}{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        {t('of')} {data.length} {t('entries')}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/expense"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className="fa-solid fa-angle-left" />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/expense"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>
                        <Link
                          className="paginate_button next"
                          to="/expense"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i className="fa-solid fa-angle-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExpenseOffcanvas
        ref={expense}
        editData={editData}
        register={register}
        onSubmit={onSubmit}
        setValue={setValue}
        getValues={getValues}
        setEditData={setEditData}
        handleSubmit={handleSubmit}
        errors={errors}
        control={control}
        clearErrors={clearErrors}
        Title={editData.id === 0 ? t('addExpense') :  t('editExpense')}
      />
    </>
  );
};

export default Driver;
