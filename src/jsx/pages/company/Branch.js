import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainPagetitle from "../../../components/MainPagetitle";
import SubCompanyTable from "../../components/Tables/SubCompanyTable";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../../context/PermissionContext";
import {
  getAllBranch,
  deleteBranch,
} from "../../../services/api/BranchServices";
import { notifySuccess } from "../../../utils/toast";
import usePagination from "../../../hooks/usePagination";
import CompanyDropdown from "../../components/CompanyDropdown";
import Paginate from "../../../components/Paginate";
import TableSkeleton from "../../../components/Skeleton/Table";

const Branch = () => {
  const { can, setUserPermission } = usePermissions();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [tempValue, setTempValue] = useState("All Companies");
  const [tempValue2, setTempValue2] = useState("All Branches");
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
  const { control, setValue } = useForm();
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const role = userData?.user?.role;
  const [companyId, setCompanyId] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState({
    id: 0,
    reseller: "",
    contact: 0,
    username: "",
    status: "",
    location: "",
    usergroup: "",
    branches: 0,
  });
  const [companyDropdown, setCompanyDropdown] = useState({
    label: t("allCompanies"),
    value: "All Companies",
  });
  const [branches, setBranches] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const { page, goToPage, setCount, totalCount, setPage } = usePagination();
  const [initialLoad, setInitialLoad] = useState(false);
  const itemsPerPage = 10;
  const handlePageClick = ({ selected }) => {
    goToPage(selected + 1);
  };

  const fetchAllBranch = async (page, CompanyId, branchId) => {
    try {
      if (page == 1) setInitialLoad(true);
      if (CompanyId) {
        const { data, success } = await getAllBranch(undefined, CompanyId);
        setTableData(data.data);
        setCount(data.totalCount);
        setBranches(data.data);
      } else if (branchId) {
        const { data, success } = await getAllBranch(
          undefined,
          undefined,
          branchId
        );
        setTableData(data.data);
        setCount(data.totalCount);
        setBranches(data.data);
      } else {
        const { data, success } = await getAllBranch(page);
        const permissions = JSON.parse(localStorage.getItem("permission"));
        setUserPermission(permissions?.[0]?.permission);
        setTableData(data.data);
        setCount(data.totalCount);
        // setBranches(data.data);
      }
    } catch (error) {
      console.log("Error in fetching data", error);
    } finally {
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAllBranch(page, id);
    } else {
      fetchAllBranch(page);
    }
  }, [page, id]);

  const filteredBranches = branches.filter(
    (branch) =>
      selectedCompany && branch.companyId._id === selectedCompany.value
  );

  const branchOptions = filteredBranches.map((branch) => ({
    value: branch._id,
    label: branch.branchName,
  }));

  const handleCompanyChange = (selectedOption) => {
    setSelectedCompany(selectedOption);
    setCompanyId(selectedOption.value);
    setPage(1);
    fetchAllBranch(1, selectedOption.value);
  };

  // Handler function for branch selection
  const handleBranchChange = (branchOption) => {
    setSelectedBranch(branchOption);
    setPage(1);
    fetchAllBranch(1, undefined, branchOption.value);
  };
  const handleClearFilter = () => {
    fetchAllBranch();
    setCompanyId(null);
    setValue("company", "");
    setValue("parent", "");
    setCompanyDropdown({
      label: "All companies",
      value: "All companies",
    });
  };

  const onConfirmDelete = async (id) => {
    await deleteBranch(id);
    notifySuccess("Branch Deleted");
    await fetchAllBranch();
  };

  const editDrawerOpen = (item) => {
    const filteredData = tableData?.filter((data) => data._id === item);
    navigate(`/branch/edit/${item}`, { state: filteredData });
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Branch"
        pageTitle={"Branch"}
        parentTitle={"Home"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t("branches")}</h4>
                    <div className="d-flex align-items-center">
                      <Link
                        className="btn  btn-xxs"
                        data-bs-toggle="offcanvas"
                        onClick={handleClearFilter}
                        to={"/branch"}
                        style={{
                          background: "gray",
                          border: "gray",
                          color: "white",
                        }}
                      >
                        Clear
                      </Link>
                      {role !== "COMPANY" && (
                        <>
                          <Link
                            className="btn  btn-xxs"
                            data-bs-toggle="offcanvas"
                            onClick={handleClearFilter}
                            to={"/branch"}
                            style={{
                              background: "gray",
                              border: "gray",
                              color: "white",
                            }}
                          >
                            Clear
                          </Link>
                          <Controller
                            name="company"
                            control={control}
                            rules={{ required: true }}
                            render={({
                              field: { onChange, value, name, ref },
                            }) => (
                              <CompanyDropdown
                                onChange={async (newValue) => {
                                  setValue("company", newValue.value);
                                  setCompanyId(newValue.value);
                                  handleCompanyChange(newValue);
                                }}
                                key={companyId}
                                value={value ? value : companyDropdown}
                                customStyles={customStyles}
                                name={name}
                                ref={ref}
                                isDisabled={role === "COMPANY" ? true : false}
                              />
                            )}
                          />
                        </>
                      )}
                      {/* <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <ParentBranchDropdown
                            key={companyId}
                            onChange={(newValue) => {
                              setValue("parent", newValue.value);
                              handleBranchChange(newValue);
                            }}
                            companyId={companyId}
                            value={value? value : branchDropdown}
                            customStyles={customStyles}
                            ref={ref}
                            name={name}
                            
                          />
                        )}
                      /> */}
                      {can("branch", "add") && (
                        <Link
                          to={"/branch/create"}
                          className="btn btn-primary btn-sm ms-1"
                          style={{ paddingBlock: "9px" }}
                          data-bs-toggle="offcanvas"
                          // onClick={()=>subCompany.current.showModal()}
                        >
                          + {t("addBranch")}
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div
                    id="employee-tbl_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <div className="table-responsive ">
                      {!tableData.length && initialLoad ? (
                        <TableSkeleton />
                      ) : (
                        <table
                          id="empoloyees-tblwrapper"
                          className="table ItemsCheckboxSec dataTable no-footer mb-0"
                        >
                          <thead>
                            <tr>
                              <th>{t("id")}</th>
                              <th>{t("branchName")}</th>
                              {/* <th>{t("parentBranch")}</th> */}
                              <th>{t("companyName")}</th>
                              <th>{t("businessGroup")}</th>
                              {/* <th>{t('mobileNumber')}</th> */}
                              <th>{t("location")}</th>
                              <th>{t("childBranches")}</th>
                              {(can("branch", "modify") ||
                                can("branch", "delete")) && (
                                <th>{t("action")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <SubCompanyTable
                              key={tableData}
                              tempValue={tempValue}
                              tempValue2={tempValue2}
                              editData={editData}
                              tableData={tableData}
                              currentPage={page}
                              itemsPerPage={itemsPerPage}
                              onConfirmDelete={onConfirmDelete}
                              editDrawerOpen={editDrawerOpen}
                              setEditData={setEditData}
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
      {/* <SubCompanyOffcanvas
                ref={subCompany}
                editData={editData}
                setEditData={setEditData}
                handleSubmit={handleSubmit}
                Title={ editData.id === 0 ? "Add Branch" : "Edit Branch"}
            /> */}
    </>
  );
};
export default Branch;
