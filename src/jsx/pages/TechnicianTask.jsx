import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MainPagetitle from "../layouts/MainPagetitle";
import TechnicianTaskTable from "../components/Tables/TechnicianTaskTable";
import TechnicianTaskOffcanvas from "../constant/TechnicianTaskOffcanvas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { technicianTaskSchema } from "../../yup";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";
import usePagination from "../../hooks/usePagination";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../services/api/TechnicianService";
import { notifyError, notifySuccess } from "../../utils/toast";
import ReactPaginate from "react-paginate";
import dayjs from "dayjs";
import { ICON } from "../constant/theme";
import Paginate from "../components/Pagination/Paginate";

const TechnicianTask = (ref) => {
  const { t } = useTranslation();
  const { isRtl } = useContext(ThemeContext);

  const [tableData, setTableData] = useState([]);
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();
  const [editData, setEditData] = useState();

  const fetchAllTasks = async (page, businessGroupId) => {
    try {
      const { data, totalCount } = await getTasks(page, 10);
      setTableData(data);
      setCount(totalCount);
    } catch (error) {
      notifyError("Error in fetching data");
    }
  };
  useEffect(() => {
    fetchAllTasks(page);
  }, [page]);

  const onConfirmDelete = async (id) => {
    try {
      await deleteTask(id);
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
    technicianTask.current.showModal();
  };
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(technicianTaskSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (data.plannedReportingDate) {
        const formattedDate = dayjs(data.plannedReportingDate).format(
          "YYYY-MM-DD"
        );
        data.plannedReportingDate = formattedDate;
      }
      if (data._id && data._id !== 0) {
        await updateTask(data, data._id);
        notifySuccess("Task Updated Successfully !!");
        technicianTask.current.closeModal();
      } else {
        await createTask(data);
        notifySuccess("Task Created Successfully !!");
        technicianTask.current.closeModal();
      }
      fetchAllTasks();
    } catch (error) {
      const validationErr = error.response?.data?.data?.errors;
      if (validationErr && validationErr.length > 0) {
        notifyError(validationErr[0].msg);
      } else notifyError(t("someErrorOccurred"));
    }
  };

  const itemsPerPage = 10;

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const technicianTask = useRef();
  return (
    <>
      <MainPagetitle
        mainTitle={t("technicianTask")}
        pageTitle={t("technicianTask")}
        parentTitle={t("technician")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("technicianTask")}</h4>
                    <div>
                      <Link
                        to={"#"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        onClick={() => {
                          clearErrors();
                          reset();
                          technicianTask.current.showModal();
                        }}
                      >
                        + {t("addTechnicianTask")}
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
                          <th>{t("id")}</th>
                          <th>{t("taskName")}</th>
                          <th>{t("taskCategory")}</th>
                          <th>{t("technicianName")}</th>
                          <th>{t("serviceLocation")}</th>
                          <th>{t("reportingTime")}</th>
                          <th>{t("action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TechnicianTaskTable
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
                          totalCount={totalCount}
                          itemsPerPage={itemsPerPage}
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
      <TechnicianTaskOffcanvas
        ref={technicianTask}
        editData={editData}
        control={control}
        setValue={setValue}
        getValues={getValues}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        setEditData={setEditData}
        handleSubmit={handleSubmit}
        clearErrors={clearErrors}
        reset={reset}
        Title={editData && editData._id !== 0 ? t("editTask") : t("addTask")}
      />
    </>
  );
};

export default TechnicianTask;
