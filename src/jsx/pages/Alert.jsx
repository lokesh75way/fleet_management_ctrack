import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import AlertOffcanvas from "../constant/AlertOffcanvas";
import { AlertData } from "../components/Tables/Tables";
import AlertTable from "../components/Tables/AlertTable";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { alertSchema } from "../../yup";
import { useTranslation } from "react-i18next";
import usePagination from "../../hooks/usePagination";
import { notifyError, notifySuccess } from "../../utils/toast";
import {
  createAlert,
  deleteAlert,
  getAlerts,
  updateAlert,
} from "../../services/api/AlertService";
import ReactPaginate from "react-paginate";
import { ICON } from "../constant/theme";
import { ThemeContext } from "../../context/ThemeContext";
import Paginate from "../components/Pagination/Paginate";



const Alert = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    clearErrors,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(alertSchema),
  });

  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();
  const { isRtl } = useContext(ThemeContext);
  const [editData, setEditData] = useState();
  const itemsPerPage=10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1); 
  };

  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  const fetchAllAlerts = async (page, businessGroupId) => {
    try {
      const { data, count } = await getAlerts(page, 10);
      setTableData(data);
      setCount(count);
    } catch (error) {
      notifyError("Error in fetching data");
    }
  };
  useEffect(() => {
    fetchAllAlerts(page);
  }, [page]);

  const onSubmit = async (data) => {
    try {
      if (data._id && data._id !== 0) {
        // update data
        await updateAlert(data, data._id);
        notifySuccess("Task Added Successfully !!");
        alert.current.closeModal();
      } else {
        await createAlert(data);
        notifySuccess("Task Added Successfully !!");
        alert.current.closeModal();
      }
    } catch (error) {
      const validationErr = error.response?.data?.data?.errors;
      if (validationErr && validationErr.length > 0) {
        notifyError(validationErr[0].msg);
      } else notifyError(t("someErrorOccurred"));
    }
  };

  const onConfirmDelete = async (id) => {
    try {
      await deleteAlert(id);
      const updatedData = tableData.filter((item) => item._id !== id);
      setTableData(updatedData);
      setCount(totalCount - 1);
      notifySuccess("Task Deleted");
    } catch (e) {
      notifyError("Something Went Wrong");
    }
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table._id === item && setEditData(table));
    alert.current.showModal();
  };

  const alert = useRef();


  async function getAlertData() {
    try {
      // const permissions = JSON.parse(localStorage.getItem('permission'));
      // setUserPermission(permissions?.[0]?.permission);
      const { data, totalPage, totalCount } = await getAlerts();
      setTableData(data);
      console.log('data came',data);
      // setCount(totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    getAlertData();
  },[]);

  return (
    <>
      <MainPagetitle
        mainTitle={t("alert")}
        pageTitle={t("alert")}
        parentTitle={t("settings")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0" style={{ flex: 1 }}>
                      {t("alert")}
                    </h4>
                    <div className="d-flex">
                      <div>
                        <Link
                          to={"#"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                          onClick={() => {
                            clearErrors();
                            reset();
                            alert.current.showModal();
                          }}
                        >
                          + {t("addAlert")}
                        </Link>{" "}
                      </div>
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
                          <th>{t("alerts")}</th>
                          <th>{t("alertName")}</th>
                          <th>{t("alertType")}</th>
                          <th>{t("createdDate")}</th>
                          <th>{t("notification")}</th>
                          <th>{t("reason")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AlertTable
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
                            pageCount={Math.ceil(totalCount / itemsPerPage)}
                            handlePageClick={handlePageClick}
                            isRtl={isRtl}
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
      <AlertOffcanvas
        ref={alert}
        Title={editData && editData._id !== 0 ? "Edit Alert" : t("addAlert")}
        editData={editData}
        setEditData={setEditData}
        register={register}
        setValue={setValue}
        onSubmit={onSubmit}
        getValues={getValues}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        clearErrors={clearErrors}
        reset={reset}
      />
    </>
  );
};

export default Alert;
