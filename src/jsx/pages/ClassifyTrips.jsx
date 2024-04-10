import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { IMAGES } from "../constant/theme";
import MainPagetitle from "../layouts/MainPagetitle";
import { ClassifyTripData } from "../components/Tables/Tables";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { classifyTripsSchema } from "../../yup";
import { Nav, Tab } from "react-bootstrap";
import { filterClassifyTable } from "../../utils/helper";
import { createTrip, getTrips } from "../../services/api/ClassifyTripServices";
import { notifySuccess } from "../../utils/toast";
import ActiveTab from './ActiveTab'
import ClassifyTripsFilterOffcanvas from "../constant/ClassifyTripsFilterOffcanvas";


const ClassifyTrip = (ref) => {
 
  const tabHeading = ["Active Trips", "Planned Trips", "Completed Trips"];
  const component = [ActiveTab,ActiveTab,ActiveTab];

  const [tableData, setTableData] = useState([]);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(classifyTripsSchema),
  });

  const [editData, setEditData] = useState({
    id: 0,
    status: "",
    title: "",
    contact: 0,
    age: 0,
    drivingExperience: 0,
    gender: "",
    location: "",
  });
  const navigate = useNavigate();

  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
  };

  const editDrawerOpen = (item) => {
    const filteredData = tableData.filter((data) => data._id === item);
    navigate(`edit/${item}`, { state: filteredData });
    // classifyTrips.current.showModal();
  };
  const filterData = (data) => {
    console.log("filtergotresponse",data);
    setTableData(data)
  };
console.log('td',tableData)
  const classifyTrips = useRef();
  const classifyTripsFilter = useRef();


  const onSubmit = async(data) => {
    try {
      await createTrip(data);
      notifySuccess("New Trip Created!");
      navigate("/settings/classifyTrips");
    } catch (error) {
      console.log("Error", error)
    }
  };



  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <MainPagetitle
        mainTitle="Classify Trip"
        pageTitle={"Classify Trip"}
        parentTitle={"Settings"}
      />
      <div className="m-2 p-2 classify_trip-container">
        <FormProvider>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Tab.Container defaultActiveKey={tabHeading[0].toLowerCase()}>
          <Nav as="ul" className="nav-tabs classify-trips">
            <div>
              {tabHeading.map((data, i) => (
                <Nav.Item as="li" key={i}>
                  <Nav.Link
                    style={{ padding: ".5rem 2rem" }}
                    eventKey={data.toLowerCase()}
                    active={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  >
                    {data}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </div>
            <div className="">
              <Link
                to={"#"}
                className="btn btn-primary btn-sm ms-1"
                data-bs-toggle="offcanvas"
                onClick={() => classifyTripsFilter.current.showModal()}
              >
                + Filter
              </Link>{" "}
              <Link
                to={"/settings/classifyTrips/create"}
                className="btn btn-primary btn-sm ms-1"
                data-bs-toggle="offcanvas"
                // onClick={() => classifyTrips.current.showModal()}
              >
                + Add Trips
              </Link>{" "}
            </div>
          </Nav>
          <Tab.Content className="pt-4">
            {tabHeading.map((data, i) => {
              console.log("m",data)
              const Component = component[i];
              return (
                
                <Tab.Pane
                  eventKey={data.toLowerCase()}
                  key={i}
                  active={i === activeIndex}
                >
                  <Component
                    tableData1={tableData}
                    data={tabHeading}
                    control={control}
                    setValue={setValue}
                    register={register}
                    getValues={getValues}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    tabType={data} 
                    
                  />
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
        <ClassifyTripsFilterOffcanvas
          ref={classifyTripsFilter}
          Title={"Add Filter"}
          filterData={filterData}
        />
        </form>
        </FormProvider>
      </div>
    </>
  );
};

export default ClassifyTrip;

