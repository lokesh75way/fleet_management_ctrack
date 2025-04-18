import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import TableSkeleton from "@/components/Skeleton/Table";
import usePagination from "@/hooks/usePagination";
import { notifyError, notifySuccess } from "@/utils/toast";
import { technicianTaskSchema } from "@/utils/yup";
import MainPagetitle from "@/components/MainPagetitle";
import Paginate from "@/components/Paginate";
import { ThemeContext } from "@/context/ThemeContext";
import usePermissions from "@/hooks/usePermissions";
import { createTask, deleteTask, getTasks, updateTask } from "../api";
import { getApiErrorMessage } from "@/utils/helper";
import TasksTable from "../components/TasksTable";
import TaskForm from "../components/Form/Task";

const TechnicianTask = () => {
  const { t } = useTranslation();
  const { isRtl } = useContext(ThemeContext);
  const [editData, setEditData] = useState();
  const { can } = usePermissions();
  const { page, goToPage, setCount, totalCount } = usePagination();
  const itemsPerPage = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => getTasks(page),
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));
  const { mutate } = useMutation({
    onError,
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    mutationFn: deleteTask,
  });

  const { mutate: createTaskMutation, isPending: createPending } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      notifySuccess("New Task Created");
      queryClient.invalidateQueries(["tasks"]);
      technicianTask.current?.closeModal();
    },
    onError,
  });

  const { mutate: editTaskMutation, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => updateTask(data, id),
    onSuccess: () => {
      notifySuccess("Task Updated Successfully");
      queryClient.invalidateQueries(["tasks"]);
      technicianTask.current?.closeModal();
    },
    onError,
  });

  useEffect(() => {
    if (data) setCount(data.totalCount);
  }, [data]);

  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const headers = [
    t("id"),
    t("taskName"),
    t("taskCategory"),
    t("technicianName"),
    t("serviceLocation"),
    t("reportingTime"),
  ];

  if (can("technician/tasks", "modify") || can("technician/tasks", "delete")) {
    headers.push(t("action"));
  }
  const editDrawerOpen = (item) => {
    const editData = data?.data?.find((task) => task._id === item);
    setEditData(editData);
    technicianTask.current?.showModal();
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
    if (data.plannedReportingDate) {
      const formattedDate = dayjs(data.plannedReportingDate).format(
        "YYYY-MM-DD"
      );
      data.plannedReportingDate = formattedDate;
    }
    if (data._id && data._id !== 0) {
      editTaskMutation({ data, id: data._id });
    } else {
      createTaskMutation(data);
    }
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
                      {can("technician/tasks", "add") && (
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
                        </Link>
                      )}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div className="table-responsive">
                      {isLoading || isFetching ? (
                        <TableSkeleton />
                      ) : (
                        <table
                          id="empoloyees-tblwrapper"
                          className="table ItemsCheckboxSec dataTable no-footer mb-0"
                        >
                          <thead>
                            <tr>
                              {headers.map((header) => (
                                <th key={header}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <TasksTable
                              tableData={data.data || []}
                              onConfirmDelete={mutate}
                              editDrawerOpen={editDrawerOpen}
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                            />
                          </tbody>
                        </table>
                      )}
                    </div>
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
      <TaskForm
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
        isLoading={createPending || editPending}
      />
    </>
  );
};

export default TechnicianTask;
