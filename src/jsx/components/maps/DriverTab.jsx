import React from "react";
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

const DriverTab = ({ tabData }) => {
  const componentData = [
    {
      running: 1,
      idle: 2,
      stopped: 4,
      inactive: 1,
      nodata: 0,
      total: 8,
      companyName: [
        {
          name: "Company1",
          driver: [
            { name: "test1", date: "22-02-2024", time: "3:00 PM" },
            { name: "test2", date: "22-02-2024", time: "3:00 PM" },
          ],
        },
        {
          name: "Company2",
          driver: [
            { name: "test3", date: "22-02-2024", time: "3:00 PM" },
            { name: "test4", date: "22-02-2024", time: "3:00 PM" },
          ],
        },
      ],
    },
    {
      allocatedDriver: 5,
      notAllocatedDriver: 7,
      totalDriver: 12,
      driverData: ["data1", "data2", "data3", "data4"],
    },
    {
      data: ["SALIK Airport-Tunnel-Dubai1", "SALIK Airport-Tunnel-Dubai2","SALIK Airport-Tunnel-Dubai3"],
    },
    {
      data: ["WRC Camp 1", "WRC Camp 2"],
    },
  ];
  const components = [
    DriverTabComponent1,
    DriverTabComponent2,
    DriverTabComponent3,
    DriverTabComponent4,
  ];
  return (
    <div className="default-tab outer-container">
      <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
        <Nav as="ul" className="nav-tabs">
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
        <Tab.Content className="p-1">
          {tabData.map((data, i) => {
            const Component = components[i];
            return (
              <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                <Component data={componentData[i]} />
              </Tab.Pane>
            );
          })}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

const DriverTabComponent1 = (props) => {
  const { running, idle, stopped, inactive, nodata, total, companyName } =
    props.data;
  return (
    <>
      <div className="row px-2">
        <Badge bg="" className="badge-success light col-lg-2 fs-9">
          <span>
            <p>{running}</p>
            <span>Running</span>
          </span>
        </Badge>
        <Badge bg="" className="badge-warning light col-lg-2 fs-9">
          <span>
            <p>{idle}</p>
            <span>Idle</span>
          </span>
        </Badge>
        <Badge bg="" className="badge-danger light col-lg-2 fs-9">
          <span>
            <p>{stopped}</p>
            <span>Stopped</span>
          </span>
        </Badge>
        <Badge bg="" className="badge-info light col-lg-2 fs-9">
          <span>
            <p>{inactive}</p>
            <span>InActive</span>
          </span>
        </Badge>
        <Badge bg="" className="badge-dark light col-lg-2 fs-9">
          <span>
            <p>{nodata}</p>
            <span>NoData</span>
          </span>
        </Badge>
        <Badge bg="" className="badge-light light col-lg-2 fs-9">
          <span>
            <p>{total}</p>
            <span>Total</span>
          </span>
        </Badge>
      </div>
      <div className="d-flex mt-2">
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
        <div className="search-driver-tab2">
          <input
            type="text"
            placeholder="search"
            className="form-control-driver-tab"
          />
          <FaSearch style={{ fontSize: "1.5rem", padding: "2px" }} />
        </div>
        <BsArrowRepeat
          style={{
            fontSize: "1.5rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <FiUpload
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
        <FaSortAlphaDown
          style={{
            fontSize: "1.5rem",
            padding: "2px",
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
        <div className=" bg-white w-100 p-2 d-flex justify-content-between">
          <span>Company 1</span>
          <span className="text-end">[1]</span>
        </div>
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
        <div className="bg-white w-100 d-flex align-items-center">
          <FaCircle
            style={{
              fontSize: "1.2rem",
              padding: "2px",
              margin: "0 .3rem",
              background: "white",
              color: "rgb(39,129,0)",
            }}
          />
          <div
            className="bg-white w-50 p-1 d-flex flex-column justify-content-between"
            style={{ fontSize: ".8rem" }}
          >
            <span>Test1</span>
            <span>22-02-2024 3:00 PM</span>
          </div>
          <div className="d-flex w-50 justify-content-evenly">
            <span>11</span>
            <FaWifi />
            <FaKey />
            <FaBatteryFull />
          </div>
        </div>
      </div>
      <div className="text-center  pt-2 mt-2 border-top border-dark">
        <Button className="me-2" variant="primary btn-sm">
          Save Selection
        </Button>
      </div>
    </>
  );
};

const DriverTabComponent2 = (props) => {
  const { allocatedDriver, notAllocatedDriver, totalDriver, driverData } =
    props.data;
  console.log(driverData);
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
        {driverData.length === 0 ? (
          <span className="p-1 text-center fs-4 ">No Record Found</span>
        ) : (
          driverData.map((d, index) => {
            return <span className="p-1 fs-6">{d}</span>;
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
  const {data} = props.data;
  return (
    <>
      <div className="d-flex mt-2">
        <div className="search-driver-tab">
          <input
            type="text"
            placeholder="search"
            className="form-control-driver-tab"
          />
          <FaSearch style={{ fontSize: "1.5rem", padding: "2px" }} />
        </div>
        <BsArrowRepeat
          style={{
            fontSize: "1.6rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <MdAddLocationAlt
          style={{
            fontSize: "1.6rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <FiUpload
          style={{
            fontSize: "1.6rem",
            padding: "2px",
            margin: "0 .3rem",
          }}
        />
        <FaFilter
          style={{
            fontSize: "1.6rem",
            padding: "3px",
            margin: "0 .3rem",
          }}
        />
      </div>
      <div className="d-flex mt-2 mb-2 fs-6 align-items-center">
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
        <div className=" bg-white w-100 p-1 d-flex justify-content-between">
          <span>All</span>
          <span className="text-end">[1]</span>
        </div>
      </div>
      {data.map((d,index) => {
        return (
          <div className="d-flex align-items-center mb-1">
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
              <span>{d}</span>
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
        );
      })}
      <div className="text-center  pt-2 mt-2 border-top border-dark">
        <Button className="me-2" variant="primary btn-sm">
          Save Selection
        </Button>
      </div>
    </>
  );
};

const DriverTabComponent4 = (props) => {
  const { data } = props.data;
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
      <Accordion className="accordian accordion-solid-bg mt-4" defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>All</Accordion.Header>
          {data.map((d, index) => {
            return (
              <Accordion.Body>
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
                    <span>{d}</span>
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
