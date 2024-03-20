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
  FaTrashAlt,
  FaLocationArrow,
} from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";
import { BsArrowRepeat } from "react-icons/bs";
import { MdFence, MdDelete, MdAddLocationAlt } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useNavigate  } from 'react-router-dom'
import DeleteModal from "../Modal/DeleteModal";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { companyOptions } from "../TabComponent/VehicleTabs/Options";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CompanyItem from "../Tracking/CompanyItem";
import { getVehicles, statusData } from "../../../utils/helper";
import CheckboxTree from 'react-checkbox-tree'
import DriverCompanyItem from "../Tracking/DriverTabComponent3";
import GeoFenceItem from "../Tracking/DriverTabComponent3";
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
                  <Component data={componentData} handleToggleCardPosition={handleToggleCardPosition} />
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
  const status = statusData();
  const { Running, Idle, Stopped, Inactive, nodata, total } = status;
  const [selectValue, setSelectValue] = useState("All");
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const data = getVehicles(selectValue);
    setVehicles(data);
  }, [selectValue]);
  const items = JSON.parse(localStorage.getItem("userJsonData"))
    .filter((item) => item.designation === "vehicle")
    .map((data) => ({
      id: data.id,
      name: data.vehicleName,
    }));
  const handleSearch = (item) => {
    const vehicleData = getVehicles(selectValue);
    console.log(vehicleData)
    const filteredData = Object.entries(vehicleData).filter((vehicle) => {
      const vec = vehicle[1].filter((data) => data.id == item.id);
      return vec.length > 0;
    });
    const convertedData = filteredData.reduce((acc, [company, dataArray]) => {
      dataArray.map((data) => {
        if (data.vehicleName === item.name) {
          acc[company] = [data];
        }
      });
      return acc;
    }, {});
    setVehicles(convertedData);
  };
  return (
    <>
      <div className="vehicle_tracking-object">
        <span
          className={`light fs-9 running ${
            selectValue === "Running" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Running")}
        >
          <p>{Running}</p>
          <span>Running</span>
        </span>
        <span
          pill
          className={`light fs-9 idle ${
            selectValue === "Idle" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Idle")}
        >
          <p>{Idle}</p>
          <span>Idle</span>
        </span>
        <span
          pill
          className={`light stopped fs-9 ${
            selectValue === "Stopped" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Stopped")}
        >
          <p>{Stopped}</p>
          <span>Stopped</span>
        </span>
        <span
          pill
          className={`light fs-9 inActive ${
            selectValue === "Inactive" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Inactive")}
        >
          <p>{Inactive}</p>
          <span>InActive</span>
        </span>
        <span
          pill
          className={`light fs-9 noData ${
            selectValue === "NoData" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("NoData")}
        >
          <p>{nodata}</p>
          <span>NoData</span>
        </span>
        <span
          className={`light fs-9 total ${
            selectValue === "All" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("All")}
        >
          <p>{total}</p>
          <span>Total</span>
        </span>
      </div>
      <div className="d-flex mt-4 mb-4">
        <ReactSearchAutocomplete
          items={items}
          className="w-100"
          styling={{
            height: "30px",
            marginRight: "10px",
            fontSize : "12px",
            color :"#4A4646"
          }}
          onSearch={(string) => {
            if (string === "") {
              const data = getVehicles(selectValue);
              setVehicles(data);
            }
          }}
          onSelect={handleSearch}
        />
      </div>
      {<CompanyItem vehicles={vehicles} handleToggleCardPositionHandler={props.handleToggleCardPosition} />}
    </>
  );
};

const DriverTabComponent2 = (props) => {
  const [selectValue, setSelectValue] = useState("All");
  const [selectAll, setSelectAll] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectDriver, setSelectDriver] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const jsonData = JSON.parse(localStorage.getItem("userJsonData"));
  const [company, setCompany] = useState(
    jsonData.filter((item) => item.role === "company")
  );
  const [drivers, setDrivers] = useState(
    jsonData.filter((item) => item.designation === "Driver")
  );
  const allocated = drivers.filter(
    (item) => item.activityStatus === "Allocated"
  );
  const notAllocated = drivers.filter(
    (item) => item.activityStatus === "Not Allocated"
  );
  const total = drivers.length;
  const handleOnSelect = (results) => {
    setSelectValue("All");
    setFilterApplied(true);
    setIsDisable(true);
    var companyDriver = jsonData.filter(
      (item) => item.designation === "Driver" && item.id === results.id
    );
    var search = company.filter(
      (item) => item.userName === companyDriver[0].parentCompany
    );
    setDrivers(companyDriver);
    setCompany(search);
  };
  const handleOnSearch = (string, results) => {
    setSelectValue("All");
    setIsDisable(false);
    setFilterApplied(false);
    setDrivers(jsonData.filter((item) => item.designation === "Driver"));
    setCompany(jsonData.filter((item) => item.role === "company"));
  };
  const handleSelectAll = (id,company,drivers, index) => {
      var checkboxArray = [...selectedDrivers]
      if (!selectAll[index]) {
        drivers.map((item)=> checkboxArray[index].push(item.id) )
      } else {
        checkboxArray[index] = []
        setSelectedDrivers(checkboxArray);
      }
      console.log(checkboxArray)
  };
  const handleSelect = (ind)=>{
    console.log(selectAll)
    setSelectAll(prev => {
      const newArr = [...prev];
      newArr[ind] = !newArr[ind]
      return newArr
    })
  }
  const handleDriverSelect = (id, ind) => {
      const updatedDrivers = [...selectedDrivers];
      if (updatedDrivers[ind].includes(id)) {
          const index = updatedDrivers[ind].indexOf(id);
          updatedDrivers[ind].splice(index, 1);
          if(updatedDrivers[ind].length === 2){
            handleSelect(ind)
          }
      } else {
          updatedDrivers[ind].push(id);
          if(updatedDrivers[ind].length === 3){
            handleSelect(ind)
          }
      }
      console.log(updatedDrivers)
      setSelectedDrivers(updatedDrivers);
  };
  useEffect(() => {
    if (selectValue !== "All") {
      setCompany(jsonData.filter((item) => item.role === "company"));
      setFilterApplied(true);
      if (selectValue === "Allocated") {
        const companyName = allocated
          .map((item) => item.parentCompany)
          .filter((value, index, array) => array.indexOf(value) === index);
        setCompany(
          company.filter((item1) =>
            companyName.some((item2) => item2 === item1.userName)
          )
        );
      }
      if (selectValue === "Not Allocated") {
        const companyName = notAllocated
          .map((item) => item.parentCompany)
          .filter((value, index, array) => array.indexOf(value) === index);
        setCompany(
          company.filter((item1) =>
            companyName.some((item2) => item2 === item1.userName)
          )
        );
      }
    } else setFilterApplied(false);
  }, [selectValue]);
  const items = jsonData
    .filter((item) => item.designation === "Driver")
    .map((item) => {
      return { id: item.id, name: item.firstName + " " + item.lastName };
    });
  return (
    <>
      <div className="px-2 vehicle_tracking-object">
        <span
          bg=""
          pill
          className={`light fs-9  running ${
            selectValue === "Allocated"
              ? "vehicle_tracking-active"
              : isDisable && "pe-none"
          }`}
          onClick={() => setSelectValue("Allocated")}
        >
          <p>{allocated.length}</p>
          <span>Allocated</span>
        </span>
        <span
          bg=""
          pill
          className={`light fs-9 idle ${
            selectValue === "Not Allocated"
              ? "vehicle_tracking-active"
              : isDisable && "pe-none"
          }`}
          onClick={() => setSelectValue("Not Allocated")}
        >
          <p>{notAllocated.length}</p>
          <span>Not Allocated</span>
        </span>
        <span
          bg=""
          pill
          className={`light fs-9 total ${
            selectValue === "Total"
              ? "vehicle_tracking-active"
              : isDisable && "pe-none"
          }`}
          onClick={() => setSelectValue("Total")}
        >
          <p>{total}</p>
          <span>Total</span>
        </span>
      </div>
      <div className="d-flex mt-4 mb-4">
        <ReactSearchAutocomplete
          items={items}
          className="w-100"
          styling={{ position: "absolute", zIndex: 999 }}
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
        {company.map((d, i) => {
          var driver = [];
          if(selectedDrivers.length === 0) company.map((item)=> selectedDrivers.push([]) && selectAll.push(false) )
          if (filterApplied) {
            if (selectValue === "All") driver = drivers;
            else if (selectValue === "Allocated")
              driver = allocated.filter(
                (item) => item.parentCompany === d.userName
              );
            else if (selectValue === "Not Allocated")
              driver = notAllocated.filter(
                (item) => item.parentCompany === d.userName
              );
            else if (selectValue === "Total")
              driver = jsonData.filter(
                (item) =>
                  item.designation === "Driver" &&
                  item.parentCompany === d.userName
              );
          } else {
            driver = jsonData.filter(
              (item) =>
                item.designation === "Driver" &&
                item.parentCompany === d.userName
            );
          }
          return (
            <Accordion
              className="accordion accordion-primary"
              defaultActiveKey="0"
            >
              <Accordion.Item
                className="accordion-item"
                key={i}
                eventKey={`$/{i}`}
              >
                <Accordion.Header className="accordian-header rounded-sm">
                  <div
                    className="form-check custom-checkbox bs_exam_topper_all"
                    style={{ marginRight: "10px" }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`customCheckBox${i}`}
                      onChange={()=>handleSelectAll(d.id, company,driver, i)}
                      onClick={()=>handleSelect(i)}
                      checked={selectAll[i]}
                      required
                    />
                  </div>
                  {d.userName}
                </Accordion.Header>
                {driver.length === 0 ? (
                  <Accordion.Body className="p-2 text-center fs-4 heading ">
                    No Record Found
                  </Accordion.Body>
                ) : (
                  driver.map((item, index) => {
                    return (
                      <Accordion.Body
                        className="accordian-body"
                        eventKey={`${i}`}
                      >
                        <div
                          key={index}
                          onClick={() => {
                            setSelectDriver(selectDriver.concat(item.id));
                          }}
                          className={`d-flex align-items-center border-bottom heading driver-select-object p-2`}
                        >
                          <div className="form-check custom-checkbox ms-3 me-3 bs_exam_topper">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              onChange={() => handleDriverSelect(item.id, i)}
                              checked={selectedDrivers[i].includes(item.id)}
                              required
                            />
                          </div>
                          <span className="fs-4 ms-2">
                            {item.firstName} {item.lastName}
                          </span>
                        </div>
                      </Accordion.Body>
                    );
                  })
                )}
              </Accordion.Item>
            </Accordion>
          );
        })}
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
  const geoData = JSON.parse(localStorage.getItem("geofenceData"));
  const [tableData, setTableData] = useState(geoData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = (query) => {
    console.log("Search Query:", query);
    setSearchQuery(query);
  };

  // Function to reset search
  const resetSearch = () => {
    setSearchQuery("");
  };

   // Filter tableData based on searchQuery
   const filteredTableData = tableData.filter((item) =>
   item.company.toLowerCase().includes(searchQuery.toLowerCase())
 );
  const onConfirmDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);

    const updatedLocalStorageData = geoData.filter((item) => item.id !== id);
    localStorage.setItem("geofenceData", JSON.stringify(updatedLocalStorageData));
  };

  const editDrawerOpen = (d) => {
    // navigate(`/geofence/map/edit/${d.id}`);
  };

  const toggleAllData = (company) => {
    let newSelectedCompanies;
    if (selectedCompanies.includes(company)) {
      newSelectedCompanies = selectedCompanies.filter((c) => c !== company);
    } else {
      newSelectedCompanies = [...selectedCompanies, company];
    }
    setSelectedCompanies(newSelectedCompanies);

    const updatedData = tableData.map((item) => {
      if (item.company === company) {
        return { ...item, selected: !selectedCompanies.includes(company) };
      }
      return item;
    });
    setTableData(updatedData);
  };

  const toggleSingleData = (id) => {
    const updatedData = tableData.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setTableData(updatedData);
  };

  // Group tableData by company name
  const groupedData = tableData.reduce((acc, cur) => {
    if (!acc[cur.company]) {
      acc[cur.company] = [];
    }
    acc[cur.company].push(cur);
    return acc;
  }, {});

  return (
    <>
      <div className="d-flex mt-4 mb-4">
     
        <ReactSearchAutocomplete
          onSearch={handleSearch}
          className="w-100"
          placeholder="Search by company name"
          styling={{
            height: "30px",
            marginRight: "10px",
            fontSize: "12px",
            color: "#red",
          }}
          // onSelect={handleSearch}
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
      
            <GeoFenceItem
              geoFences={groupedData}
              handleToggleCardPositionHandler={props.handleToggleCardPosition}
            />
        
      </div>
    </>
  );
};
export default DriverTab;
