import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainPagetitle from "../../../components/MainPagetitle";
import InviteCustomer from "../../constant/ModalList";
import { ExpenseData } from "../../components/Tables/Tables";
import ExpenseTable from "../../components/Tables/ExpenseTable";
// import ExpenseOffcanvas from "../constant/ExpenseOffcanvas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseSchema } from "../../../utils/yup";

import { useTranslation } from "react-i18next";
import {
  deleteExpense,
  getExpenses,
} from "../../../services/api/ExpenseServices";
import usePagination from "../../../hooks/usePagination";
import { ThemeContext } from "../../../context/ThemeContext";
import clsx from "clsx";
import { notifySuccess } from "../../../utils/toast";
import ReactPaginate from "react-paginate";
import Paginate from "../../../components/Paginate";
import TableSkeleton from "@/components/Skeleton/Table";

const Expense = (ref) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isRtl } = useContext(ThemeContext);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(expenseSchema),
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
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();

  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  // const[formData, setFormData] = useState()
  const getAllExpenses = async () => {
    try {
      setIsLoading(true);
      const { data, success, totalLength } = await getExpenses(page);
      setTableData(data);
      setCount(totalLength);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllExpenses();
  }, []);

  const onConfirmDelete = async (id) => {
    await deleteExpense(id);
    notifySuccess("Expense Deleted");
    await getAllExpenses();
  };
  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);
    navigate(`edit/${item}`, { state: filteredData });
    // company.current.showModal();
  };

  const expense = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t("expense")}
        pageTitle={t("expense")}
        parentTitle={t("settings")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("expense")}</h4>
                    <div>
                      <Link
                        to={"/settings/expense/create"}
                        className="btn btn-primary btn-sm ms-1"
                        // data-bs-toggle="offcanvas"
                        // onClick={() => {expense.current.showModal(); console.log(expense)}}
                      >
                        + {t("addExpense")}
                      </Link>{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    {!tableData.length && isLoading ? (
                      <TableSkeleton />
                    ) : (
                      <table
                        id="empoloyees-tblwrapper"
                        className="table ItemsCheckboxSec dataTable no-footer mb-0"
                      >
                        <thead>
                          <tr>
                            <th>{t("id")}</th>
                            <th>{t("vehicleName")}</th>
                            <th>{t("expenseDate")}</th>
                            <th>{t("amount")}</th>
                            <th>{t("description")}</th>
                            <th>{t("action")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <ExpenseTable
                            editData={editData}
                            tableData={tableData}
                            onConfirmDelete={onConfirmDelete}
                            editDrawerOpen={editDrawerOpen}
                            setEditData={setEditData}
                            currentPage={page}
                            itemsPerPage={itemsPerPage}
                          />
                        </tbody>
                      </table>
                    )}
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        {t("showing")} {(page - 1) * 10 + 1} {t("to")}{" "}
                        {Math.min(page * 10, totalCount)} {t("of")} {totalCount}{" "}
                        {t("entries")}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Paginate
                          totalCount={totalCount}
                          itemsPerPage={itemsPerPage}
                          handlePageClick={handlePageClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ExpenseOffcanvas
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
      /> */}
    </>
  );
};

export default Expense;
