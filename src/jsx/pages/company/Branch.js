import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import SubCompanyTable from "../../components/Tables/SubCompanyTable";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useStorage from "../../../hooks/useStorage";
// import { SubCompanyData } from '../../components/Tables/Tables';

const Branch = () => {



  const navigate = useNavigate();
  const params = useParams();

  const { getAllCompany } = useStorage();
  const [selectFilter, setFilter] = useState({
    value: "All Companies",
    label: "All Companies",
  });
  const [selectFilter2, setFilter2] = useState({
    value: "All",
    label: "All",
  });
  const [tempValue, setTempValue] = useState("All");
  const [tempValue2, setTempValue2] = useState("All");
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
    if (params.id) {
      const user = JSON.parse(localStorage.getItem("userJsonData"));
      const username = user.filter((data) => data.id == params.id)[0].userName;
      console.log("this is user name bro",username);

      setFilter({
        value: username,
        label: username,
      });

      setValue('parent',username);
    }
  }, [params.id]);

  const loggedinUser = localStorage.getItem("loginDetails-name");
  // const SubCompanyData = JSON.parse( localStorage.getItem('branchData'));
  const role = localStorage.getItem("role");
  const { control, setValue, getValues, watch } = useForm();
  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const SubCompanyData = userData.filter((item) => item.role === "branch");

  const [tableData, setTableData] = useState(SubCompanyData);
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
  console.log(tableData);

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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);

    // Remove item from local storage
    const updatedLocalStorageData = SubCompanyData.filter(
      (item) => item.id !== id
    );
    localStorage.setItem("branchData", JSON.stringify(updatedLocalStorageData));
  };

  const editDrawerOpen = (item) => {
    tableData.map((table) => table.id === item && setEditData(table));
    navigate(`edit/${item}`);
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
  let branchOptions = d
    .filter((item) => item.role === "branch")
    .map((item) => ({
      label: item.userName,
      value: item.id,
    }));

  companyOptions = [...companyOptions, { label: "All Companies", value: "All" }];
  branchOptions = [...branchOptions, { label: "All Branches", value: "All" }];

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
  

  console.log('this is filter data',selectFilter);
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
                    <h4 className="heading mb-0">Branches</h4>
                    <div className="d-flex align-items-center">
                      <Controller
                        name="parent"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Select
                            onChange={(newValue) => {
                              setTempValue2(newValue.label);
                              setTempValue('All');
                              setValue("parentBranch", newValue.label);
                            }}
                            ref={ref}
                            name={name}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            styles={customStyles}
                            options={branchOptions}
                            defaultValue={{value:'All Branches',label:'All Branches'}}
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
                              setTempValue(newValue.label);
                              setTempValue2("All");
                              setValue("parent", newValue.label);
                              setFilter({value:newValue.value,label:newValue.label})
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
                      <Link
                        to={"/branch/create"}
                        className="btn btn-primary btn-sm ms-1 p-2"
                        data-bs-toggle="offcanvas"
                        // onClick={()=>subCompany.current.showModal()}
                      >
                        + Add Branch
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
                          <th>ID</th>
                          <th>Branch Name</th>
                          <th>Company Name</th>
                          <th>Business Group</th>
                          <th>Mobile Number</th>
                          <th>Location</th>
                          <th>Zip Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <SubCompanyTable
                          tempValue={tempValue}
                          tempValue2={tempValue2}
                          params={params}
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
                        Showing {activePag.current * sort + 1} to{" "}
                        {data.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : data.length}{" "}
                        of {data.length} entries
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
                          <i className="fa-solid fa-angle-left" />
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
                          <i className="fa-solid fa-angle-right" />
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
