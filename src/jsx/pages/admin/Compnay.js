import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainPagetitle from "../../layouts/MainPagetitle";
import CompanyTable from "../../components/Tables/CompanyTable";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const Company = () => {
  const navigate = useNavigate();
  const allData = JSON.parse(localStorage.getItem("userJsonData"));
  const [selectFilter, setFilter] = useState({
    value: "All",
    label: "All",
  });
  const [tempValue, setTempValue] = useState("All");
  console.log("Filter valeus are", selectFilter);
  const CompanyData = allData.filter((item) => item.role === "company");
  const [data, setData] = useState(
    document.querySelectorAll("#employee-tbl_wrapper tbody tr")
  );
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      const user = JSON.parse(localStorage.getItem("userJsonData"));
      const username = user.filter((data) => data.id == id)[0].userName;
      console.log(username);
      setFilter({
        value: username,
        label: username,
      });
      setTempValue(username);
    }
  }, [id]);

  const { control, setValue, getValue } = useForm();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
      marginRight: "1rem",
      marginLeft: "1rem",
      width: "15rem",
      menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      menu: (provided) => ({ ...provided, zIndex: 9999 }),
    }),
  };

  const [tableData, setTableData] = useState(CompanyData);
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
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);

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
  return (
    <>
      <MainPagetitle
        mainTitle="Company"
        pageTitle={"Company"}
        parentTitle={"Home"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting">
                  <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                    <h4 className="heading mb-0">Companies</h4>
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
                            }}
                            ref={ref}
                            menuPortalTarget={document.body}
                            menuPosition={"fixed"}
                            name={name}
                            styles={customStyles}
                            options={businessGroupOptions}
                            defaultValue={[
                              {
                                value: selectFilter?.value,
                                label: selectFilter?.label,
                              },
                            ]}
                          />
                        )}
                      />
                      <Link
                        to={"/company/create"}
                        className="btn btn-primary btn-sm ms-1"
                        data-bs-toggle="offcanvas"
                        // onClick={()=>company.current.showModal()}
                      >
                        + Add Company
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
                          <th>Business Group</th>
                          <th>Company Name</th>
                          <th>Mobile Number</th>
                          <th>Location</th>
                          <th>Email</th>
                          <th>Branches</th>
                          <th>Zip Code</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <CompanyTable
                          tableData={tableData}
                          tempValue={tempValue}
                          // getData={getData}
                          onConfirmDelete={onConfirmDelete}
                          editDrawerOpen={editDrawerOpen}
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
                          to="/company"
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
