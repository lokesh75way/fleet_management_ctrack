import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import CompanyTable from "../../components/Tables/CompanyTable";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { clsx } from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import useStorage from "../../../hooks/useStorage";
import { usePermissions } from "../../../context/PermissionContext";
import {
  deleteCompany,
  getCompany,
} from "../../../services/api/CompanyServices";
import { notifyError, notifySuccess } from "../../../utils/toast";
import { getGroups } from "../../../services/api/BusinessGroup";
import usePagination from "../../../hooks/usePagination";
import ReactPaginate from "react-paginate";
import { ICON } from "../../constant/theme";
import Paginate from "../../components/Pagination/Paginate";
import GroupDropdown from "../../components/GroupDropdown";

const Company = () => {
  const [businessGroupNames, setBusinessGroupNames] = useState();

  const { isRtl } = useContext(ThemeContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [selectFilter, setFilter] = useState({
    value: "All Business Groups",
    label: t('allBusinessGroup'),
  });
  const [businessGroupOptions, setBusinessGroupOptions] = useState([]);
  const [tempValue, setTempValue] = useState("All");
  const { id } = useParams();
  const { page, nextPage, prevPage, goToPage, setCount, totalCount, setPage } =
    usePagination();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [dropdownDisable, setDropdownDisable] = useState(false);
  const itemsPerPage = 10;
  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };
  const startIndex = (page - 1) * itemsPerPage;
  const slicedData = tableData.slice(startIndex, startIndex + itemsPerPage);

  const { control, setValue, getValue } = useForm();
  const customStyles = {
    control: (base) => ({
      ...base,
      marginRight: "1rem",
      marginLeft: "1rem",
      width: "15rem",
      height: "0.6rem",
      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      menu: (provided) => ({ ...provided, zIndex: 9999 }),
    }),
  };

  const fetchAllCompany = async (page,groupId) => {
    try {
      let responseData;
      if (userDetails?.user?.role === "SUPER_ADMIN") {
        responseData = await getCompany(page,groupId);
      } else if (userDetails?.user?.role === "BUSINESS_GROUP") {
        setDropdownDisable(true);
        const businessId = userDetails?.user?.businessGroupId[0]?._id;
        responseData = await getCompany(page, businessId);
      }
      const { data, success, totalCount } = responseData;
      const permissions = JSON.parse(localStorage.getItem("permission"));
      setUserPermission(permissions?.[0]?.permission);
      setTableData(data.data.data);
      setCount(data.data.totalCount);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };
  useEffect(() => {
    if(id){
      fetchAllCompany(page,id);
      // setValue('companyOptions', id)
    }else{
      fetchAllCompany(page);
    }
  }, [page,id]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if(id){
  //       fetchAllCompany(1,id);
  //     }
  //   }, 1000); 
  //   return () => clearTimeout(timeout); 
  // }, [id]);

  const handleChangeBusinessGroup = (selectedOption) => {
    setFilter(selectedOption);
    setPage(1);
    fetchAllCompany(1, selectedOption.value);
  };
  async function getGroupData() {
    try {
      const { data, totalLength } = await getGroups();
      setBusinessGroupNames(data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  }

  useEffect(() => {
    getGroupData();
  }, []);

  useEffect(() => {
    if (businessGroupNames) {
      setBusinessGroupOptions(
        businessGroupNames.map((item) => ({
          label: item.businessGroupId?.groupName,
          value: item.businessGroupId?._id,
        }))
      );
    }
  }, [businessGroupNames]);

  // for deleting data in table
  const onConfirmDelete = async (_id) => {
    try {
      await deleteCompany(_id);
      fetchAllCompany();
      notifySuccess("Company Deleted");
    } catch (e) {
      notifyError("Something Went Wrong");
    }
  };
  const editDrawerOpen = (_id) => {
    const data = tableData.filter((item) => item._id === _id);
    navigate(`edit/${_id}`, { state: { formData: data } });
  };

  const handleClearFilter = () => {
    fetchAllCompany(page);
    setValue("companyOptions", "");
    setFilter({
      label: t('allBusinessGroup'),
      value: "All Business Group",
    });
  };
  const { can, setUserPermission } = usePermissions();
  return (
    <>
      <MainPagetitle
        mainTitle={t("company")}
        pageTitle={t("company")}
        parentTitle={t("home")}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("companies")}</h4>
                    <div className="d-flex align-items-center">
                    <Link
                        className="btn  btn-xxs"
                        data-bs-toggle="offcanvas"
                        onClick={handleClearFilter}
                        to={"/company"}
                        style={{
                          background: "gray",
                          border: "gray",
                          color: "white",
                        }}
                      >
                        Clear
                      </Link>
                      <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setTempValue(newValue.label);
                              setValue("companyOptions", newValue.label);
                              handleChangeBusinessGroup(newValue);
                            }}
                            ref={ref}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            name={name}
                            styles={customStyles}
                            options={businessGroupOptions}
                            isDisabled={dropdownDisable}
                            value={value ? value : selectFilter}
                          />
                        
                        )}
                      />
                      {can("company", "add") && (
                        <Link
                          to={"/company/create"}
                          className="btn btn-primary btn-sm ms-1"
                          data-bs-toggle="offcanvas"
                          style={{ paddingBlock: "9px" }}
                        >
                          + {t("addCompany")}
                        </Link>
                      )}
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
                          <th className="text-center">{t("companyName")}</th>
                          <th className="text-center">{t("businessGroup")}</th>
                          {/* <th>{t('mobileNumber')}</th> */}
                          <th className="text-center">{t("location")}</th>
                          <th className="text-center">{t("email")}</th>
                          <th className="text-center">{t("branches")}</th>
                
                          {(can("company", "edit") ||
                            can("company", "delete")) && (
                            <th className="d-flex justify-content-center">
                              {t("action")}
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <CompanyTable
                          key={tableData}
                          tableData={tableData}
                          tempValue={tempValue}
                          currentPage={page}
                          itemsPerPage={itemsPerPage}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
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
      {/* <CompanyOffcanvas 
                ref={company}
                Title={ editData.id === 0 ? "Add Company" : "Edit Company"}
                handleSubmit={handleSubmit}
                editData={editData}
                setEditData={setEditData}
            /> */}
    </>
  );
};
export default Company;
