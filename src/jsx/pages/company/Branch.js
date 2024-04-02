import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import SubCompanyTable from "../../components/Tables/SubCompanyTable";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useStorage from "../../../hooks/useStorage";
import {useTranslation} from 'react-i18next'

import { clsx } from 'clsx';

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { usePermissions } from "../../../context/PermissionContext";
import { getAllBranch , createBranch, deleteBranch } from "../../../services/api/BranchServices";
import { notifySuccess } from "../../../utils/toast";

// import { SubCompanyData } from '../../components/Tables/Tables';

const Branch = () => {
  
  const {isRtl} = useContext(ThemeContext);
  const arrowleft = clsx({'fa-solid fa-angle-right':isRtl, 'fa-solid fa-angle-left':!isRtl})
  const arrowright = clsx({'fa-solid fa-angle-left':isRtl, 'fa-solid fa-angle-right':!isRtl})
  const {can} = usePermissions()

  const {t} = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  const { getAllCompany } = useStorage();
  const [selectFilter, setFilter] = useState({
    value: "All Companies",
    label: "All Companies",
  });
  const [selectFilter2, setFilter2] = useState({
    value: "All Branches",
    label: "All Branches",
  });
  const [tempValue, setTempValue] = useState("All Companies");
  const [tempValue2, setTempValue2] = useState("All Branches");
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const customStyles = {
    control: (base) => ({
      ...base,
      marginRight: "1rem",
      marginLeft: "1rem",
      width: "15rem",
      height:"0.6rem",
      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      menu: (provided) => ({ ...provided, zIndex: 9999 }),
    }),
  };

  useEffect(() => {
    const str = window.location.pathname;
    
    if (str.includes('cid')) {
      const user = JSON.parse(localStorage.getItem("userJsonData"));
      const username = user.filter((data) => data.id == params.id)[0].userName;

      setFilter({
        value: username,
        label: username,
      });
      setTempValue(username)

      setValue('parent',username);
    }
    if (str.includes('bid')) {
      const user = JSON.parse(localStorage.getItem("userJsonData"));
      const username = user.filter((data) => data.id == params.id)[0].userName;

      setFilter2({
        value: username,
        label: username,
      });
      setTempValue2(username)

      setValue('parent',username);
    }
  }, [params.id]);

  const loggedinUser = localStorage.getItem("loginDetails-name");
  // const SubCompanyData = JSON.parse( localStorage.getItem('branchData'));
  const role = localStorage.getItem("role");
  const { control, setValue, getValues, watch } = useForm();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const SubCompanyData = userData.filter((item) => item.role === "branch");

  const fetchAllBranch = async()=>{
    const {data, success} = await getAllBranch()
    console.log(data)
    setTableData(data.data)
  }


  const [tableData, setTableData] = useState([]);
  const [dataLength, setDataLength] = useState(SubCompanyData.length);
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

  useEffect(()=>{
    fetchAllBranch()
  },[])
  
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
  const onConfirmDelete = async(id) => {
    await deleteBranch(id)
    notifySuccess("Branch Deleted");
    await fetchAllBranch()
  };

  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);
    navigate(`edit/${item}`,{state : filteredData});
    // company.current.showModal();
  };

  const invite = useRef();
  const subCompany = useRef();
  const d = JSON.parse(localStorage.getItem("userJsonData"));
  
  let companyOptions = d
    .filter((item) => item.role === "company")
    .map((item) => ({
      label: item.userName,
      value: item.id,
    }));


  let allbranchOptions  = d
    .filter((item) => item.role === "branch")
    .map((item) => ({
      label: item.userName,
      value: item.id,
    }));
    allbranchOptions = [...allbranchOptions, { label: "All Branches", value: "All Branches" }];
    const [branchOptions,setBranchOptions] = useState(allbranchOptions)

  useEffect(()=>{
    
    let tempoptions = d
    .filter((item) => item.role === "branch" && tempValue !== 'All Companies' && item.parentCompany === tempValue)
    .map((item) => ({
      label: item.userName,
      value: item.id,
    }));

    if(tempValue !== 'All Companies') setBranchOptions(tempoptions)
    else setBranchOptions(allbranchOptions);

  },[tempValue])


  companyOptions = [...companyOptions, { label: "All Companies", value: "All Companies" }];
  

  useEffect(() => {
    if (role === "admin") return;
    else if (role === "businessgroup") {
      const filteredData = SubCompanyData.filter(
        (item) => item.parentBusinessGroup === loggedinUser
      );
      setTableData(filteredData);
    } else if (role === "company") {
      const filteredData = SubCompanyData.filter(
        (item) => item.parentCompany === loggedinUser
      );
      setTableData(filteredData);
    }
  }, [loggedinUser, role, SubCompanyData]);
  
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
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">{t('branches')}</h4>
                    <div className="d-flex align-items-center">
                    <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setTempValue(newValue.label);
                              setTempValue2("All Branches");
                              setValue("parent", newValue.label);
                              setFilter({value:newValue.value,label:newValue.label})
                              setFilter2({value:'All Branches',label:"All Branches"})
                            }}
                            ref={ref}
                            name={name}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            styles={customStyles}
                            options={companyOptions}
                            value= {selectFilter}
                            
                            // defaultValue={{value:getValues("parent"),label:getValues("parent")}}
                          />
                        )}
                      />
                      <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setTempValue2(newValue.label);
                              setTempValue('All Companies');
                              setValue("parentBranch", newValue.label);
                              setFilter2({value:newValue.value,label:newValue.label})
                            }}
                            ref={ref}
                            name={name}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            styles={customStyles}
                            options={branchOptions}
                            value={selectFilter2}
                          />
                        )}
                      />
                      {can('branch','add') && <Link
                        to={"/branch/create"}
                        className="btn btn-primary btn-sm ms-1"
                        style={{paddingBlock : '9px'}}
                        data-bs-toggle="offcanvas"
                        // onClick={()=>subCompany.current.showModal()}
                      >
                        + {t('addBranch')}
                      </Link>}{" "}
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
                          <th>{t('branchName')}</th>
                          <th>{t('parentBranch')}</th>
                          <th>{t('companyName')}</th>
                          <th>{t('businessGroup')}</th>
                          {/* <th>{t('mobileNumber')}</th> */}
                          <th>{t('location')}</th>
                          <th>{t('childBranches')}</th>
                          {(can('branch','modify') || can('branch','delete')) && <th>{t('action')}</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <SubCompanyTable
                          tempValue={tempValue}
                          setDataLength={setDataLength}
                          tempValue2={tempValue2}
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
                        {dataLength.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : dataLength}{" "}
                        {t('of')} {dataLength} {t('entries')}
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/branch"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className={arrowleft}/>
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/branch"
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
                          to="/branch"
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
