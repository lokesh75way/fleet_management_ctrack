import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import CompanyTable from "../../components/Tables/CompanyTable";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {useTranslation} from 'react-i18next'
import { clsx } from 'clsx';

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import useStorage from "../../../hooks/useStorage";
import { usePermissions } from "../../../context/PermissionContext";
import { deleteCompany, getCompany } from "../../../services/api/CompanyServices";
import { notifyError, notifySuccess } from "../../../utils/toast";



const Company = () => {
  
  const {isRtl} = useContext(ThemeContext);
  const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
  const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const allData = JSON.parse(localStorage.getItem("userJsonData"));
  const [selectFilter, setFilter] = useState({
    value: "All Business Groups",
    label: "All Business Groups",
  });
  const [tempValue, setTempValue] = useState("All");
  let CompanyData = allData.filter((item) => item.role === "company");
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const { id } = useParams();
  console.log(id);
  const fetchAllCompany = async()=>{
    const {data, success} = await getCompany()
    // CompanyData = data.data.data
    setTableData(data.data.data)
  }

    useEffect(()=>{
      fetchAllCompany()
    },[])


  useEffect(() => {
    if (id) {
      const user = JSON.parse(localStorage.getItem("userJsonData"));
      const username = user.filter((data) => data.id === id)[0].userName;

      setFilter({
        value: username,
        label: username,
      });
      setValue('parent',username);
      setTempValue(username);
    }
  }, [id]);

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


  const [dataLength, setDataLength] = useState(CompanyData.length);
  const [editData, setEditData] = useState({
    id: 0,
    title: "",
    contact: 0,
    email: "",
    status: "",
    location: "",
    usergroup: "",
  });
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
  // for deleting data in table
  const onConfirmDelete = async(_id) => {
    try{
      await deleteCompany(_id)
      notifySuccess("Company Deleted")
    }
    catch(e){
      notifyError("Something Went Wrong")
    }

    // Remove item from local storage
    const updatedLocalStorageData = CompanyData.filter(
      (item) => item.id !== id
    );
    localStorage.setItem(
      "companyData",
      JSON.stringify(updatedLocalStorageData)
    );
  };
  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));
    navigate(`edit/${item}`);
    // company.current.showModal();
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
  const d = JSON.parse(localStorage.getItem("userJsonData"));
  let businessGroupOptions = d
    .filter((item) => item.role === "businessgroup")
    .map((item) => ({
      label: item.userName,
      value: item.id,
    }));
  businessGroupOptions = [
    ...businessGroupOptions,
    { label: "All", value: "All" },
  ];
  const company = useRef();
  const edit = useRef();
  const { can } = usePermissions()
  return (
    <>
      <MainPagetitle
        mainTitle={t('company')}
        pageTitle={t('company')}
        parentTitle={t('home')}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('companies')}</h4>
                    <div className="d-flex align-items-center">
                      <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                          
                            onChange={(newValue) => {
                              setTempValue(newValue.label);
                              setValue("companyOptions", newValue.label);
                              setFilter({value:newValue.value,label:newValue.label})
                            }}
                            ref={ref}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            name={name}
                            styles={customStyles}
                            options={businessGroupOptions}
                            value={[
                              {
                                value: selectFilter.value,
                                label: selectFilter.label,
                              },
                            ]}
                          />
                        )}
                      />
                      {can('company','add') && <Link
                        to={"/company/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        style={{paddingBlock : '9px'}}
                      >
                        + {t('addCompany')}
                      </Link>}
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
                          {/* <th>{t('id')}</th> */}
                          <th>{t('companyName')}</th>
                          <th>{t('businessGroup')}</th>
                          {/* <th>{t('mobileNumber')}</th> */}
                          <th>{t('location')}</th>
                          <th>{t('email')}</th>
                          <th>{t('branches')}</th>
                          <th>{t('zipCode')}</th>
                          {(can('company', 'edit') || can('company', 'delete') ) && <th>{t('action')}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <CompanyTable
                          tableData={tableData}
                          tempValue={tempValue}
                          setDataLength={setDataLength}
                          // getData={getData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
                        />
                      </tbody>
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center">
                      <div className="dataTables_info">
                        {t('showing')} {activePag.current * sort + 1} {t('to')} {" "}
                        {dataLength > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : dataLength}{" "}
                        {t('of')}  {dataLength} {t('entries')} 
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/company"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className={arrowleft} />
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/company"
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
                          to="/company"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          <i className={arrowright} />
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
