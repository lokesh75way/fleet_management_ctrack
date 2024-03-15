import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Nav, Tab } from "react-bootstrap";
import "../../../scss/pages/_driver-tracking.scss";
import {
  FaSearch,
  FaFilter,
  FaSortAlphaDown,
  FaCircle,
  FaWifi,
  FaBatteryFull,
  FaEdit,
} from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";
import { BsArrowRepeat } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import { MdFence, MdDelete, MdAddLocationAlt } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CompanyItem from "../Tracking/CompanyItem";

const DriverTab = ({ tabData, handleToggleCardPosition, isOutside }) => {
  const componentData = {
    name: "Company1",
    drivers: [
      { name: "driver1", timeStamp: "22-02-2024 3:00 PM", status: "running" },
      { name: "driver2", timeStamp: "22-02-2024 3:00 PM", status: "idle" },
      { name: "driver3", timeStamp: "22-02-2024 3:00 PM", status: "inactive" },
      { name: "driver4", timeStamp: "22-02-2024 3:00 PM", status: "running" },
      { name: "driver5", timeStamp: "22-02-2024 3:00 PM", status: "stopped" },
      { name: "driver6", timeStamp: "22-02-2024 3:00 PM", status: "stopped" },
      { name: "driver7", timeStamp: "22-02-2024 3:00 PM" },
    ],
    allocatedDriver: 4,
    notAllocatedDriver: 3,
    totalDriver: 7,
  };

  const components = [
    DriverTabComponent1,
    DriverTabComponent2,
    DriverTabComponent3,
  ];

  return (
    <>
      <div
        className={`default-tab outer-container ${
          isOutside ? "toggleBarInside" : "toggleBarOutside"
        }`}
      >
        <button
          onClick={handleToggleCardPosition}
          className="driver_tracking_button"
        >
          {!isOutside ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
        <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
          <Nav as="ul" className="nav-tabs tracking_navTabs">
            {tabData.map((data, i) => {
              const Icon = data.icon;
              return (
                <Nav.Item as="li" key={i}>
                  <Nav.Link eventKey={data.name.toLowerCase()}>
                    <Icon className="tab-icon" />
                    {data.name}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Tab.Content className="p-2 py-4" style={{ background: "#f5f5f5" }}>
            {tabData.map((data, i) => {
              const Component = components[i];
              return (
                <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                  <Component data={componentData} />
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

const DriverTabComponent1 = (props) => {
  const { drivers } = props.data;
  let statusData = {
    running: 0,
    idle: 0,
    stopped: 0,
    inactive: 0,
    nodata: 0,
    total: drivers.length,
  };
  drivers.forEach((driver) => {
    statusData[driver.status]++;
  });
  const { running, idle, stopped, inactive, nodata, total } = statusData;
  const [selectValue, setSelectValue] = useState(["All"]);
  const handleClick = (value) => {
    if (selectValue.includes(value)) {
      setSelectValue(selectValue.filter((item) => item !== value));
    } else {
      setSelectValue([...selectValue, value]);
    }
  };
  return (
    <>
      <div className="vehicle_tracking-object">
        <span
          className={`light fs-9 ${
            selectValue.includes("Running") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("Running")}
        >
          <p>{running}</p>
          <span>Running</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue.includes("Idle") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("Idle")}
        >
          <p>{idle}</p>
          <span>Idle</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue.includes("Stopped") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("Stopped")}
        >
          <p>{stopped}</p>
          <span>Stopped</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue.includes("InActive") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("InActive")}
        >
          <p>{inactive}</p>
          <span>InActive</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue.includes("NoData") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("NoData")}
        >
          <p>{nodata}</p>
          <span>NoData</span>
        </span>
        <span
          className={`light fs-9 ${
            selectValue.includes("All") && "vehicle_tracking-active"
          }`}
          onClick={() => handleClick("All")}
        >
          <p>{total}</p>
          <span>Total</span>
        </span>
      </div>
      <div className="d-flex mt-4 mb-4">
        <ReactSearchAutocomplete
          // items={items}
          className="w-100"
          styling={{
            height : '30px'
          }}
          onSearch={() => {}}
          onSelect={() => {}}
        />
      </div>
      <CompanyItem />
      {/* <CompanyItem /> */}
      {/* <CompanyItem /> */}
      <div className="text-center  pt-4 mt-4 border-top border-dark">
        <Button className="me-2" variant="primary btn-md">
          Save Selection
        </Button>
      </div>
    </>
  );
};

const DriverTabComponent2 = (props) => {
  const [selectValue, setSelectValue] = useState("All");
  const [selectDriver, setSelectDriver] = useState([]);
  const jsonData = JSON.parse(localStorage.getItem("userJsonData"));
  const [drivers, setDrivers] = useState(
    jsonData.filter((item) => item.designation === "Driver")
  );
  const allocated = drivers.filter(
    (item) => item.activityStatus === "Allocated"
  ).length;
  const notAllocated = drivers.filter(
    (item) => item.activityStatus === "Not Allocated"
  ).length;
  const [searchedDriver, setSearchedDriver] = useState({});
  const total = drivers.length;

  const handleOnSelect = (results) => {
    setSearchedDriver({
      id: results.id,
      name: results.name,
    });
  };
  const handleOnSearch = (string, results) => {
    if (string === "")
      setDrivers(jsonData.filter((item) => item.designation === "Driver"));
  };

  useEffect(() => {
    if (searchedDriver?.id)
      setDrivers(jsonData.filter((item) => item.id === searchedDriver.id));
    else if (selectValue === "Allocated")
      setDrivers(
        jsonData.filter(
          (item) =>
            item.designation === "Driver" && item.activityStatus === "Allocated"
        )
      );
    else if (selectValue === "Not Allocated")
      setDrivers(
        jsonData.filter(
          (item) =>
            item.designation === "Driver" &&
            item.activityStatus === "Not Allocated"
        )
      );
    else if (selectValue === "Total" || !searchedDriver?.id)
      setDrivers(jsonData.filter((item) => item.designation === "Driver"));
  }, [searchedDriver, selectValue]);

  const items = jsonData
    .filter((item) => item.designation === "Driver")
    .map((item) => {
      return { id: item.id, name: item.firstName + " " + item.lastName };
    });
  return (
    <>
      <div className="px-2 driver_tracking-object">
        <span
          bg=""
          pill
          className={`light fs-9 ${
            selectValue === "Allocated" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Allocated")}
        >
            <p>{allocated}</p>
            <span>Allocated</span>
        </span>
        <span
          bg=""
          pill
          className={`light fs-9 ${
            selectValue === "Not Allocated" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Not Allocated")}
        >

            <p>{notAllocated}</p>
            <span>Not Allocated</span>
        </span>
        <span
          bg=""
          pill
          className={`light fs-9 ${
            selectValue === "Total" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Total")}
        >
            <p>{total}</p>
            <span>Total</span>
        </span>
      </div>
      <div className="d-flex mt-4 mb-4">
        <ReactSearchAutocomplete
         styling={{
          height : '30px'
        }}
          items={items}
          className="w-100"
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
        />
      </div>
      <div
        className="d-flex flex-column bg-white p-2"
        style={{
          border: " 1px solid white",
          marginTop: ".5rem",
          height: "65vh",
          overflowY: "scroll",
        }}
      >
        {drivers.length === 0 ? (
          <span className="p-2 text-center fs-4 ">No Record Found</span>
        ) : (
          drivers.map((d, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectDriver(selectDriver.concat(d.id));
                }}
                className={`d-flex align-items-center border-bottom heading driver-select-object p-2`}
              >
                <div className="form-check custom-checkbox ms-3 me-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    required
                  />
                </div>
                <GrUserPolice className="m-2 driver-select-object" />
                <span className="fs-4 ms-2">
                  {d.firstName} {d.lastName}
                </span>
              </div>
            );
          })
        )}
      </div>
      <div className="mt-3 text-center">
        <Button className="w-25 btn-md" variant="primary btn-md">
          XLS
        </Button>
      </div>
    </>
  );
};
const DriverTabComponent3 = (props) => {
  const { drivers } = props.data;
  return (
    <>
      <div className="d-flex mt-2">
        <div className="search-driver-tab">
          <input type="text" className="form-control-driver-tab" />
          <FaSearch style={{ fontSize: "1.5rem", padding: "2px" }} />
        </div>
        <MdFence
          style={{
            fontSize: "1.5rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <FaFilter
          style={{
            fontSize: "1.5rem",
            padding: "3px",
            margin: "0 .3rem",
          }}
        />
      </div>
      <div className="d-flex mt-2 fs-6 align-items-center">
        <div
          className="form-check custom-checkbox"
          style={{ marginRight: "5px" }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            id="customCheckBox1"
            required
          />
        </div>
        <div
          className=" bg-white p-2 d-flex justify-content-between"
          style={{ width: "80%" }}
        >
          <span>Company 1</span>
        </div>
        <BsArrowRepeat
          style={{
            fontSize: "2.2rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
      </div>
      <Accordion
        className="accordian accordion-solid-bg mt-4"
        defaultActiveKey="0"
        flush
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>All</Accordion.Header>
          {drivers.map((d, index) => {
            return (
              <Accordion.Body className="p-2">
                <div className="d-flex align-items-center">
                  <div
                    className="form-check custom-checkbox"
                    style={{ marginRight: "5px" }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="customCheckBox1"
                      required
                    />
                  </div>
                  <div className=" bg-white w-100 p-2 d-flex justify-content-between">
                    <span>{d.name}</span>
                    <div className="d-flex justify-content-around">
                      <IoIosNavigate
                        style={{
                          fontSize: "1.5rem",
                          padding: "2px",
                          margin: "0 .3rem",
                          background: "white",
                        }}
                      />
                      <FaEdit
                        style={{
                          fontSize: "1.5rem",
                          padding: "2px",
                          margin: "0 .3rem",
                          background: "white",
                        }}
                      />
                      <MdDelete
                        style={{
                          fontSize: "1.5rem",
                          padding: "2px",
                          margin: "0 .3rem",
                          background: "white",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            );
          })}
        </Accordion.Item>
      </Accordion>
    </>
  );
};
export default DriverTab;
