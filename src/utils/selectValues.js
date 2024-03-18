export const getSelectValues = (id) => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return {
      business: {
        disabled: false,
        defaultValues: "",
      },
      company: {
        disabled: false,
        defaultValues: "",
      },
    };
  } else if (role === "businessgroup") {
    const businessName = localStorage.getItem("loginDetails-name");
    return {
      business: {
        disabled: true,
        defaultValues: businessName,
      },
      company: {
        disabled: false,
        defaultValues: "",
      },
    };
  } else if (role === "company") {
    const companyName = localStorage.getItem("loginDetails-name");
    const user = JSON.parse(localStorage.getItem("userJsonData")).filter(
      (item) => item.userName === companyName
    );
    return {
      business: {
        disabled: true,
        defaultValues: user[0].parent,
      },
      company: {
        disabled: true,
        defaultValues: companyName,
      },
    };
  }
};

export const getVehicles = (filter) => {
  const data = JSON.parse(localStorage.getItem("userJsonData"));
  let vehicle;
  if (filter === "All") {
    vehicle = data.filter((data) => data.designation === "vehicle");
  } else {
    vehicle = data.filter(
      (data) => data.designation === "vehicle" && data.status === filter
    );
  }

  const groupedData = vehicle.reduce(
    (acc, { company, vehicleName, coordinate, status , id }) => {
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push({ vehicleName, coordinate, status , id });
      return acc;
    },
    {}
  );
  return groupedData;
};

export const statusData = () => {
  const data = JSON.parse(localStorage.getItem("userJsonData"));
  let vehicle = data.filter((data) => data.designation === "vehicle");
  let status = {
    Running: 0,
    Idle: 0,
    Stopped: 0,
    Inactive: 0,
    nodata: 0,
    total: vehicle.length,
  };
  vehicle.forEach((vehicle) => {
    if(vehicle.status){
      status[vehicle.status]++;
    }
    else{
      status['nodata']++;
    }
  });
  return status;
};
