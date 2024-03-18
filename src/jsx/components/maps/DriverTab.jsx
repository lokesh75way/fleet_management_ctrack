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
import { getVehicles, statusData } from "../../../utils/selectValues";
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
          className={`light fs-9 ${
            selectValue === "Running" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Running")}
        >
          <p>{Running}</p>
          <span>Running</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue === "Idle" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Idle")}
        >
          <p>{Idle}</p>
          <span>Idle</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue === "Stopped" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Stopped")}
        >
          <p>{Stopped}</p>
          <span>Stopped</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue === "Inactive" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Inactive")}
        >
          <p>{Inactive}</p>
          <span>InActive</span>
        </span>
        <span
          pill
          className={`light fs-9 ${
            selectValue === "NoData" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("NoData")}
        >
          <p>{nodata}</p>
          <span>NoData</span>
        </span>
        <span
          className={`light fs-9 ${
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
        <Badge
          bg=""
          pill
          className={`light border fs-9 ${
            selectValue === "Allocated" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Allocated")}
        >
          <span>
            <p>{allocated}</p>
            <span>Allocated</span>
          </span>
        </Badge>
        <Badge
          bg=""
          pill
          className={`light border fs-9 ${
            selectValue === "Not Allocated" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Not Allocated")}
        >
          <span>
            <p>{notAllocated}</p>
            <span>Not Allocated</span>
          </span>
        </Badge>
        <Badge
          bg=""
          pill
          className={`light border fs-9 ${
            selectValue === "Total" && "vehicle_tracking-active"
          }`}
          onClick={() => setSelectValue("Total")}
        >
          <span >
            <p>{total}</p>
            <span>Total</span>
          </span>
        </Badge>
      </div>
      <div className="d-flex mt-4 mb-4">
          <ReactSearchAutocomplete
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
                onClick={()=>{setSelectDriver(selectDriver.concat(d.id)); console.log(selectDriver);}}
                className={`d-flex align-items-center border-bottom heading driver-select-object p-2`}
              >
                <div
                  className="form-check custom-checkbox ms-3 me-3"
                >
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
      <div className="mt-3 text-center" style={{ width: "100%" }}>
        <Button className="w-50" variant="primary btn-lg">
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
