import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-country-state-city/dist/react-country-state-city.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CustomInput from "../../components/Input/CustomInput";
import ParentBranchDropdown from "../../components/ParentBranch";
import Error from "../../components/Error/Error";
import VehicleDropdown from "../../components/VehicleDropdown";
import { TypeOptions } from "../../components/TabComponent/VehicleTabs/Options";
import FileUploader from "../../../components/FileUploader";

const SettingExpense = ({
  Title,
  editData,
  setEditData,
  register,
  setValue,
  getValues,
  handleSubmit,
  onSubmit,
  errors,
  control,
  clearErrors,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [workHour, setWorkHour] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [addEmploye, setAddEmploye] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckCJ, setIsCheckCJ] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [tempValue, setTempValue] = useState();
  const [dValues, setDvalues] = useState([]);
  const [bill, setBill] = useState(null)
  const nav = useNavigate();
  const location = useLocation();
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setValue("category", e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedOption2(e.target.value);
    setValue("jobAllocation", e.target.value);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
    }
  }, [id]);

  useEffect(() => {
    if (id && dValues?.fromDate && dValues?.toDate && dValues?.expenseDate) {
      setValue("branch", dValues?.branch);
      setValue("type", dValues?.type);
      setValue("amount", dValues?.amount);
      setValue("referenceNumber", dValues?.referenceNumber);
      setValue("odometer", dValues?.odometer);
      setValue("description", dValues?.description);
      setValue("workHour", dValues?.workHour);
      const  fromDate = new Date(dValues?.fromDate)
      setValue('fromDate', fromDate)
      const  toDate = new Date(dValues?.toDate)
      setValue('toDate', toDate)
      const  expenseDate = new Date(dValues?.expenseDate)
      setValue('expenseDate', expenseDate)
      setValue("bill", dValues?.bill);
      setValue('category', dValues?.category)
      setBill(dValues?.bill)
    }
  }, [dValues, id]);
  return (
    <>
      <div className="p-4">
        <div className="row" style={{ width: "70%", margin: "auto" }}>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("branch")}
              <span className="text-danger">*</span>
            </label>
            <Controller
              name="branch"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <ParentBranchDropdown
                  onChange={(newValue) => {
                    setValue("branch", newValue.value);
                  }}
                  value={value}
                  customStyles={customStyles}
                  ref={ref}
                  name={name}
                />
              )}
            />
            {!getValues("branch") && <Error errorName={errors.branch} />}
          </div>
          <div className="col-xl-6 mb-3">
            <label className="form-label">
              {t("category")}
              <span className="text-danger">*</span>
            </label>
            <div className="basic-form" style={{ marginTop: ".5rem" }}>
              <div className="form-check custom-checkbox form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="VARIABLE"
                  checked={ (getValues('category') ?? selectedOption ) === "VARIABLE"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  style={{ marginBottom: "0" }}
                >
                  {t("variable")}
                </label>
              </div>
              <div className="form-check custom-checkbox form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="FIX"
                  checked={ (getValues('category') ?? selectedOption ) === "FIX"}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label"
                  style={{ marginBottom: "0" }}
                >
                  {t("FIX")}
                </label>
              </div>
            </div>
            {!getValues("category") && <Error errorName={errors.category} />}
          </div>

     { selectedOption === "VARIABLE" &&
         <div className="col-xl-6 mb-3">
            <label className="form-label">{t("considerJob")}</label>
            <div
              className={`${
                selectedOption !== "VARIABLE"
                  ? "form-check custom-checkbox mb-3 pe-none"
                  : "form-check custom-checkbox mb-3"
              }`}
            >
              <input
                type="checkbox"
                className="form-check-input"
                id="customCheckBox1"
                onClick={() => setIsCheckCJ(!isCheckCJ)}
              />
            </div>
          </div>
}
          {isCheckCJ &&
            <>
              <div className="col-xl-6 mb-3">
                <label className="form-label">{t("jobAllocation")}</label>
                <div className="basic-form" style={{ marginTop: ".5rem" }}>
                  <div
                    className={`${
                      !isCheckCJ
                        ? "form-check custom-checkbox form-check-inline pe-none"
                        : "form-check custom-checkbox form-check-inline"
                    }`}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      value="inProgress"
                      checked={selectedOption2 === "inProgress"}
                      onChange={handleChange2}
                    />
                    <label
                      className="form-check-label"
                      style={{ marginBottom: "0" }}
                    >
                      {t("inProgress")}
                    </label>
                  </div>
                  <div
                    className={`${
                      !isCheckCJ
                        ? "form-check custom-checkbox form-check-inline pe-none"
                        : "form-check custom-checkbox form-check-inline"
                    }`}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      value="completed"
                      checked={selectedOption2 === "completed"}
                      onChange={handleChange2}
                    />
                    <label
                      className="form-check-label"
                      style={{ marginBottom: "0" }}
                    >
                      {t("completed")}
                    </label>
                  </div>
                </div>
              </div>
              {selectedOption2 === "completed" &&
                <>
                  <div className="col-xl-6 mb-3">
                    <label className="form-label">{t("completedTill")}</label>
                    <div
                      className={`${
                        selectedOption2 !== "completed"
                          ? "d-flex align-items-center pe-none"
                          : "fd-flex align-items-center"
                      }`}
                    >
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            selected={getValues("startDate") || new Date()}
                            className="form-control"
                            onChange={(newValue) =>
                              setValue("startDate", newValue)
                            }
                          />
                        )}
                      />
                      <span className="mx-2">{t("to")}</span>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ value, name }) => (
                          <DatePicker
                            selected={getValues("endDate") || new Date()}
                            className="form-control"
                            onChange={(newValue) =>
                              setValue("endDate", newValue)
                            }
                          />
                        )}
                      />
                    </div>
                  </div>
                </>
              }
              <div className="col-xl-6 mb-3 ">
                <label className="form-label">{t("job")}</label>
                <Controller
                  name="job"
                  control={control}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      onChange={(newValue) => setValue("job", newValue.value)}
                      // options={jobOptions}
                      ref={ref}
                      name={name}
                      styles={customStyles}
                      // defaultValue={jobOptions[0]}
                    />
                  )}
                />
              </div>
            </>
          }
          <div className="col-xl-6 mb-3 ">
            <label className="form-label">
              {t("type")}
              <span className="text-danger">*</span>
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange, value, name, ref } }) => (
                <Select
                  onChange={(newValue) => {
                    setTempValue(newValue.value);
                    setValue("type", newValue.value);
                  }}
                  options={TypeOptions}
                  ref={ref}
                  name={name}
                  styles={customStyles}
                  value={
                    TypeOptions.filter(
                      (l) => l.value == getValues("type")
                    )?.[0]
                  }
                  // defaultValue={TypeOptions[0]}
                />
              )}
            />
            {!getValues("type") && <Error errorName={errors.type} />}
          </div>

            <div className={`col-xl-6 mb-3`}>
              <label className="form-label">
                {t("fromDate")} <span className="text-danger">*</span>
              </label>
              <Controller
                name="fromDate"
                control={control}
                render={({ value, name }) => {
                  // const value = dValues?.fromDate;
                  return (
                    <DatePicker
                      selected={getValues('fromDate') || new Date()}
                      className="form-control"
                      onChange={(newValue) => {
                        setValue("fromDate", newValue);
                      }}
                    />
                  );
                }}
              />
              {!getValues("fromDate") && <Error errorName={errors.fromDate} />}
            </div>

            <div
              className={`col-xl-6 mb-3`}
            >
              <label className="form-label">
                {t("toDate")} <span className="text-danger">*</span>
              </label>
              <Controller
                name="toDate"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={getValues("toDate") || new Date()}
                    className="form-control"
                    onChange={(newValue) => {
                      setTempValue(newValue);
                      setValue("toDate", newValue);
                    }}
                  />
                )}
              />
              {!getValues("toDate") && <Error errorName={errors.toDate} />}
            </div>
      
        <div
            className={` col-xl-6 mb-3 `}
          >
            <label className="form-label">
              {t("expenseDate")} <span className="text-danger">*</span>
            </label>
            <Controller
              name="expenseDate"
              control={control}
              render={({ value, name }) => (
                <DatePicker
                  selected={getValues("expenseDate") || new Date()}
                  className="form-control"
                  onChange={(newValue) => setValue("expenseDate", newValue)}
                />
              )}
            />
            {!getValues("expenseDate") && (
              <Error errorName={errors.expenseDate} />
            )}
          </div>

          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("amount")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              register={register}
              label="Amount"
              name="amount"
              placeholder=""
            />
            <Error errorName={errors.amount} />
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("referenceNumber")} <span className="text-danger">*</span>
            </label>
            <CustomInput
              type="number"
              register={register}
              label="Reference Number"
              name="referenceNumber"
              placeholder=""
            />
            <Error errorName={errors.referenceNumber} />
          </div>

          <>
            <div
              className={`${
                selectedOption !== "VARIABLE"
                  ? "col-xl-6 mb-3 pe-none"
                  : "col-xl-6 mb-3"
              }`}
            >
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("odometer")}
              </label>
              <CustomInput
                type="number"
                register={register}
                label="Odometer"
                name="odometer"
                placeholder=""
              />
            </div>
            <div
              className={`${
                selectedOption !== "VARIABLE"
                  ? "col-xl-6 mb-3 pe-none"
                  : "col-xl-6 mb-3"
              }`}
            >
              <label htmlFor="exampleFormControlInput3" className="form-label">
                {t("workHour")}
              </label>
              <Controller
                name="workHour"
                control={control}
                render={({ value, name }) => (
                  <DatePicker
                    selected={workHour}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    timeIntervals={15}
                    className="form-control customDateHeight"
                    onChange={(newValue) => setWorkHour(newValue)}
                    value={value}
                    name={name}
                  />
                )}
              />
            </div>
          </>

          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("billUpload")}
            </label>
            <FileUploader
              setValue={setValue}
              register={register}
              label="bill"
              name="bill"
              getValue={getValues}
              setLoading={setLoading}
              loading={loading}
              link={bill}
            />
            {loading && <small>Uploading...</small>}
          </div>
          <div className="col-xl-6 mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              {t("description")}
            </label>
            <CustomInput
              type="textarea"
              register={register}
              label="Description"
              name="description"
              placeholder=""
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <button
            type="submit"
            onClick={() => {
              handleSubmit(onSubmit);
            }}
            className="btn btn-primary me-1"
          >
            {id ? "Update" : "Submit"}
          </button>
          <Link
            to={"#"}
            onClick={() => setAddEmploye(false)}
            className="btn btn-danger light ms-1"
          >
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
};

export default SettingExpense;
