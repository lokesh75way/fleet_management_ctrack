import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import "../../../scss/pages/_driver-tracking.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import CompanyItem from "../Tracking/CompanyItem";
import { getVehicles, statusData } from "../../../utils/helper";


import GeoFenceItem from "../Tracking/DriverTabComponent3";
import DriverItem from "../Tracking/DriverItem";
import { notifyError } from "../../../utils/toast";
import { getVehiclesByCompany } from "../../../services/api/VehicleService";

const DriverTab = ({ tabData, handleToggleCardPosition, isOutside, setVehicleIds, getVehiclesByIds, setVehicleStatus, vehicleCounts }) => {
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
          <Tab.Content
            className="p-2 py-4"
            style={{
              background: "#f5f5f5",
              overflow: "scroll",
              height: "100vh",
            }}
          >
            {tabData.map((data, i) => {
              const Component = components[i];
              return (
                <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                  <Component
                    data={componentData}
                    handleToggleCardPosition={handleToggleCardPosition}
                    setVehicleIds={setVehicleIds}
                    getVehiclesByIds={getVehiclesByIds}
                    setVehicleStatus={setVehicleStatus}
                    vehicleCounts={vehicleCounts}
                  />
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
  const { setVehicleStatus, vehicleCounts } = props;
  
  const { running, idle, stopped, inactive, nodata, total } = vehicleCounts;
  const [selectValue, setSelectValue] = useState("All");
  const [vehicles, setVehicles] = useState([]);

  const [companyVehicle, setCompanyVehicle] = useState([]);

  const getVehiclesList = async(search) =>{
    try{
      const data = await getVehiclesByCompany(search);
      await setCompanyVehicle(data?.data ?? [])
      return;
    }catch(e){
      notifyError("Some Error occured")
    }
  }


  useEffect(() => {
    getVehiclesList();
    // const data = getVehicles(selectValue);
    // setVehicles(data);
  }, [selectValue]);

  const items = JSON.parse(localStorage?.getItem("userJsonData")) ? JSON.parse(localStorage?.getItem("userJsonData")) 
    .filter((item) => item.designation === "vehicle")
    .map((data) => ({
      id: data.id,
      name: data.vehicleName,
    })): [];

  const handleSearch = (item) => {

    const vehicleData = getVehicles(selectValue);

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
          onClick={() => {setSelectValue("Running"); setVehicleStatus("RUNNING"); } }
        >
          <p>{running}</p>
          <span>Running</span>
        </span>
        <span
          pill
          className={`light fs-9 idle ${
            selectValue === "Idle" && "vehicle_tracking-active"
          }`}
          onClick={() => { setSelectValue("Idle"); setVehicleStatus("IDLE"); }}
        >
          <p>{idle}</p>
          <span>Idle</span>
        </span>
        <span
          pill
          className={`light stopped fs-9 ${
            selectValue === "Stopped" && "vehicle_tracking-active"
          }`}
          onClick={() => { setSelectValue("Stopped"); setVehicleStatus("STOP"); }}
        >
          <p>{stopped}</p>
          <span>Stopped</span>
        </span>
        <span
          pill
          className={`light fs-9 inActive ${
            selectValue === "Inactive" && "vehicle_tracking-active"
          }`}
          onClick={() => { setSelectValue("Inactive"); setVehicleStatus("INACTIVE"); }}
        >
          <p>{inactive}</p>
          <span>InActive</span>
        </span>
        <span
          pill
          className={`light fs-9 noData ${
            selectValue === "NoData" && "vehicle_tracking-active"
          }`}
          onClick={() => { setSelectValue("NoData"); setVehicleStatus("NODATA"); }}
        >
          <p>{nodata}</p>
          <span>NoData</span>
        </span>
        <span
          className={`light fs-9 total ${
            selectValue === "All" && "vehicle_tracking-active"
          }`}
          onClick={() => { setSelectValue("All"); setVehicleStatus(""); }}
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
            fontSize: "12px",
            color: "#4A4646",
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
      {
        <CompanyItem
          companyVehicle={companyVehicle ?? []}
          setVehicleIds={props.setVehicleIds}
          vehicles={vehicles}
          getVehiclesByIds={props.getVehiclesByIds}
          handleToggleCardPositionHandler={props.handleToggleCardPosition}
        />
      }
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
  const jsonData = JSON.parse(localStorage.getItem("userJsonData")) ? JSON.parse(localStorage.getItem("userJsonData")): [];
  const [companyDrivers, setCompanyDrivers] = useState([]);
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

  useEffect(() => {
    const newCompanyDrivers = company.reduce((acc, company) => {
      const companyDrivers = jsonData.filter((item) => item.designation === "Driver" && item.parentCompany === company.userName);

      if (companyDrivers.length > 0) {
        acc[company.userName] = companyDrivers;
      }
      return acc;
    }, {}); 
    setCompanyDrivers(newCompanyDrivers);
  }, [company]);

  useEffect(() => {

  const companyDrivers = company.reduce((acc, company) => {
    const drivers = jsonData.filter((item) => 
      item.designation === "Driver" && 
      item.parentCompany === company.userName &&
      (selectValue != "All" ? item.activityStatus === selectValue: true)
    );

    if (drivers.length > 0) {
      acc[company.userName] = drivers;
    }
    return acc;
  }, {});
  setCompanyDrivers(companyDrivers);
  }, [selectValue]);

  const total = drivers.length;

  const handleOnSelect = (item) => {
    const selectedCompanyId = item.id;

  const companyDriversData = company.reduce((acc, company) => {
    const driversForCompany = jsonData.filter((driver) =>
      driver.designation === "Driver" &&
      driver.parentCompany === company.userName &&
      driver.id === selectedCompanyId
    );

    if (driversForCompany.length > 0) {
      acc[company.userName] = driversForCompany;
    }
    return acc;
  }, {});

  setCompanyDrivers(companyDriversData);
  };

  const handleOnSearch = (string, results) => {
    if(string === ""){
      const newCompanyDrivers = company.reduce((acc, company) => {
        const companyDrivers = jsonData.filter((item) => item.designation === "Driver" && item.parentCompany === company.userName);

        if (companyDrivers.length > 0) {
          acc[company.userName] = companyDrivers;
        }
        return acc;
      }, {}); 
      setCompanyDrivers(newCompanyDrivers);
    }
  };
  const handleSelectAll = (id, company, drivers, index) => {
    var checkboxArray = [...selectedDrivers];
    if (!selectAll[index]) {
      drivers.map((item) => checkboxArray[index].push(item.id));
    } else {
      checkboxArray[index] = [];
      setSelectedDrivers(checkboxArray);
    }

  };
  const handleSelect = (ind) => {

    setSelectAll((prev) => {
      const newArr = [...prev];
      newArr[ind] = !newArr[ind];
      return newArr;
    });
  };
  const handleDriverSelect = (id, ind) => {
    const updatedDrivers = [...selectedDrivers];
    if (updatedDrivers[ind].includes(id)) {
      const index = updatedDrivers[ind].indexOf(id);
      updatedDrivers[ind].splice(index, 1);
      if (updatedDrivers[ind].length === 2) {
        handleSelect(ind);
      }
    } else {
      updatedDrivers[ind].push(id);
      if (updatedDrivers[ind].length === 3) {
        handleSelect(ind);
      }
    }

    setSelectedDrivers(updatedDrivers);
  };
  
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
            fontSize: "12px",
            color: "#red",
          }}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
        />
      </div>
      {
        <DriverItem
        key={companyDrivers}
          drivers={companyDrivers}
          handleToggleCardPositionHandler={props.handleToggleCardPosition}
        />
        }
    </>
  );
};

const DriverTabComponent3 = (props) => {
  const geoData = JSON.parse(localStorage.getItem("geofenceData")) ? JSON.parse(localStorage.getItem("geofenceData")) : [];
  const [tableData, setTableData] = useState(geoData);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = (query) => {

    const fenceData = geoData.filter((item) => item.id === query.id);
    setTableData(fenceData);
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

    // const updatedLocalStorageData = geoData.filter((item) => item.id !== id);
    // localStorage.setItem(
    //   "geofenceData",
    //   JSON.stringify(updatedLocalStorageData)
    // );
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

  const items = tableData.map((data) => ({
    id: data.id,
    name: data.name,
  }));

  return (
    <>
      <div className="d-flex mt-4 mb-4">
        <ReactSearchAutocomplete
          items={items}
          // onSearch={handleSearch}
          className="w-100"
          styling={{
            height: "30px",
            marginRight: "10px",
            fontSize: "12px",
            color: "#red",
          }}
          onSelect={handleSearch}
        />
      </div>
      <div
        className="d-flex flex-column p-2"
        style={{
          marginTop: ".5rem",
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
