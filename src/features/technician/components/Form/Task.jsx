import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Offcanvas } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider } from "react-hook-form";
import Select from "react-select";
import "@/assets/scss/pages/_driver-tracking.scss";
import { useTranslation } from "react-i18next";

import { taskCategoryOptions, severityOptions } from "@/constants/options";
import Error from "@/components/Error/Error";
import CustomInput from "@/components/Input/CustomInput";
import TechnicianDropdownList from "../DropdownList";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const TaskForm = forwardRef(
  (
    {
      Title,
      handleSubmit,
      editData,
      setEditData,
      control,
      setValue,
      getValues,
      register,
      errors,
      clearErrors,
      onSubmit,
      reset,
      isLoading,
    },
    ref
  ) => {
    const [addEmploye, setAddEmploye] = useState(false);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      showModal() {
        setAddEmploye(true);
      },

      closeModal() {
        reset();
        clearErrors();
        setAddEmploye(false);
      },
    }));

    useEffect(() => {
      reset({});
      clearErrors();
      if (addEmploye && editData) {
        reset({ ...editData, technician: editData.technician._id });
        setValue("description", editData.description);
      } else setEditData();
    }, [addEmploye]);

    return (
      <>
        <Offcanvas
          show={addEmploye}
          onHide={setAddEmploye}
          className="offcanvas-end customeoff"
          placement="end"
        >
          <div className="offcanvas-header">
            <h5 className="modal-title" id="#gridSystemModal">
              {Title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAddEmploye(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="container-fluid">
              <FormProvider>
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        {t("technician")} <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="technician"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <TechnicianDropdownList
                            onChange={(newValue) => {
                              setValue("technician", newValue.value);
                            }}
                            defaultValue={value}
                            value={value}
                            customStyles={customStyles}
                            ref={ref}
                            name={name}
                          />
                        )}
                      />

                      <Error errorName={errors.technician} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        {t("taskCategory")}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="c"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setValue("taskCategory", newValue.value);
                            }}
                            options={taskCategoryOptions}
                            ref={ref}
                            name={name}
                            styles={customStyles}
                            value={value}
                            defaultValue={{
                              value: getValues("taskCategory")
                                ? getValues("taskCategory")
                                : taskCategoryOptions[0].value,
                              label: getValues("taskCategory")
                                ? getValues("taskCategory")
                                : taskCategoryOptions[0].label,
                            }}
                          />
                        )}
                      />
                      <Error errorName={errors.taskCategory} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label
                        htmlFor="exampleFormControlInput2"
                        className="form-label"
                      >
                        {t("taskName")} <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        register={register}
                        name="taskName"
                        label="Task Name"
                        placeholder=""
                      />
                      <Error errorName={errors.taskName} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        {t("taskPriority")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="taskPriority"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setValue("taskPriority", newValue.value);
                            }}
                            options={severityOptions}
                            ref={ref}
                            name={name}
                            styles={customStyles}
                            defaultValue={{
                              value: getValues("taskPriority")
                                ? getValues("taskPriority")
                                : severityOptions[0].value,
                              label: getValues("taskPriority")
                                ? getValues("taskPriority")
                                : severityOptions[0].label,
                            }}
                          />
                        )}
                      />
                      <Error errorName={errors.taskPriority} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label
                        htmlFor="exampleFormControlInput3"
                        className="form-label"
                      >
                        {t("contactPersonNumber")}
                      </label>
                      <CustomInput
                        type="number"
                        register={register}
                        name="contactPersonNumber"
                        label="Contact Person Number"
                        placeholder=""
                      />
                      <Error errorName={errors.contactPersonNumber} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">
                        {t("serviceLocation")}
                        <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="text"
                        name="serviceLocation"
                        register={register}
                        label="Service Location"
                        placeholder=""
                      />
                      <Error errorName={errors.serviceLocation} />
                    </div>
                    <div className="col-xl-6 mb-3 d-flex flex-column">
                      <label className="form-label">
                        {t("plannedReportingDate")}{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="plannedReportingDate"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            selected={
                              getValues("plannedReportingDate")
                                ? new Date(getValues("plannedReportingDate"))
                                : new Date()
                            }
                            className="form-control customDateHeight"
                            onChange={(newValue) =>
                              setValue("plannedReportingDate", newValue)
                            }
                          />
                        )}
                      />
                      <Error errorName={errors.plannedReportingDate} />
                    </div>
                    <div className="col-xl-6 mb-3 ">
                      <label className="form-label">
                        {t("reportingTime")}
                        <span className="text-danger">*</span>
                      </label>
                      <CustomInput
                        type="time"
                        register={register}
                        name="reportingTime"
                        label="Reporting Time"
                        placeholder=""
                      />
                      <Error errorName={errors.reportingTime} />
                    </div>
                    <div className="col-xl-6 mb-3">
                      <label className="form-label">{t("description")}</label>
                      <div className="mb-3 ">
                        <Controller
                          name="description"
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <textarea
                              className="form-txtarea form-control"
                              register={register("description")}
                              name="description"
                              label="Description"
                              rows="8"
                              id="comment"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => {
                        handleSubmit(onSubmit);
                      }}
                      className="btn btn-primary me-1 m-1"
                      disabled={isLoading}
                    >
                      {t("submit")}
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setAddEmploye(false)}
                      className="btn btn-danger light ms-1 m-1"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </Offcanvas>
      </>
    );
  }
);

export default TaskForm;
