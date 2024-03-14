import React, { useState } from "react";
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
import { BsArrowRepeat } from "react-icons/bs";
import { RiAddBoxFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";
import { MdFence, MdDelete, MdAddLocationAlt } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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
            selectValue.includes('InActive') && "vehicle_tracking-active"
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
      <div className="d-flex mt-2 mb-4">
        <div className="search-driver-tab2">
          <input
            type="text"
            placeholder="search"
            className="form-control-driver-tab"
          />
          <FaSearch style={{ fontSize: "1.5rem", padding: "2px" }} />
        </div>
      </div>

      <CompanyItem />
      {/* <CompanyItem /> */}
      {/* <CompanyItem /> */}

      <div className="text-center  pt-4 mt-4 border-top border-dark">
        <Button className="me-2" variant="primary btn-sm">
          Save Selection
        </Button>
      </div>
    </>
  );
};

const DriverTabComponent2 = (props) => {
  const { allocatedDriver, notAllocatedDriver, totalDriver, drivers } =
    props.data;
  return (
    <>
      <div className="row px-2">
        <Badge bg="" className="badge-success light col-lg-4">
          <span>
            <span>Allocated</span>
            <p>{allocatedDriver}</p>
          </span>
        </Badge>
        <Badge bg="" className="badge-danger light col-lg-4">
          <span>
            <span>Not Allocated</span>
            <p>{notAllocatedDriver}</p>
          </span>
        </Badge>
        <Badge bg="" className="badge-dark light col-lg-4">
          <span>
            <span>Total</span>
            <p>{totalDriver}</p>
          </span>
        </Badge>
      </div>
      <div className="d-flex mt-2">
        <div className="search-driver-tab">
          <input type="text" className="form-control-driver-tab" />
          <FaSearch style={{ fontSize: "1.5rem", padding: "2px" }} />
        </div>
        <BsArrowRepeat
          style={{
            fontSize: "1.5rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <FaFilter
          style={{
            fontSize: "1.5rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
      </div>
      <div
        className="d-flex flex-column bg-white"
        style={{ border: " 1px solid white", marginTop: ".5rem" }}
      >
        {drivers.length === 0 ? (
          <span className="p-1 text-center fs-4 ">No Record Found</span>
        ) : (
          drivers.map((d, index) => {
            return <span className="p-1 fs-6">{d.name}</span>;
          })
        )}
      </div>
      <div className="mt-3 text-center" style={{ width: "100%" }}>
        <Button className="me-2" variant="primary btn-sm">
          XLS
        </Button>
        <Button className="me-2" variant="primary btn-sm">
          PDF
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
