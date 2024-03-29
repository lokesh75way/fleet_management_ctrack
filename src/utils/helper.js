import useStorage from "../hooks/useStorage";

export const getSelectValues = (id) => {
  const user  = JSON.parse(localStorage.getItem('userDetails'))
  const role = user.user.role
  if (role === "SUPER_ADMIN") {
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
  } else if (role === "BUSINESS_GROUP") {
    const businessName = user.user.userName
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
  } else if (role === "COMPANY") {
    const companyName = user.user.userName
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
    (acc, { company, vehicleName, coordinate, status, id }) => {
      if (!acc[company]) {
        acc[company] = [];
      }
      acc[company].push({ vehicleName, coordinate, status, id });
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
    if (vehicle.status) {
      status[vehicle.status]++;
    } else {
      status["nodata"]++;
    }
  });
  return status;
};

export function filterAlerts(
  startDateStr,
  endDateStr,
  companyName,
  parentBusinessName,
  data = []
) {
  if (!Array.isArray(data)) {
    console.error("Data is not an array.");
    return [];
  }
  let startDate = startDateStr ? new Date(startDateStr) : new Date(0); // Default to epoch if startDate is not provided
  let endDate = endDateStr ? new Date(endDateStr) : new Date(); // Default to current date if endDate is not provided

  return data.filter((item) => {
    let currentDate = new Date(item.createdDate);
    let isDateInRange = currentDate >= startDate && currentDate <= endDate;

    let isCompanyMatch =
      companyName === "All Companies"
        ? true
        : item.parentCompany === companyName;
    let isParentBusinessMatch =
      parentBusinessName === "All Groups"
        ? true
        : item.parentBusiness === parentBusinessName;

    return isDateInRange && isCompanyMatch && isParentBusinessMatch;
  });
}

export function findHighestAndLowestDates(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return { highestDate: null, lowestDate: null };
  }

  let highestDate = new Date(data[0].createdDate);
  let lowestDate = new Date(data[0].createdDate);

  for (let i = 1; i < data.length; i++) {
    let currentDate = new Date(data[i].createdDate);
    if (currentDate > highestDate) {
      highestDate = currentDate;
    }
    if (currentDate < lowestDate) {
      lowestDate = currentDate;
    }
  }

  return { highestDate, lowestDate };
}

export function filterClassifyTable(filter, data) {
  const { branch, from, to, search } = filter;
  let filteredData = data;
  if(branch.label !== 'All'){
    filteredData = data.filter((item) => item.branch === branch.label);
  }
  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    filteredData = filteredData.filter((item) => {
      const startTime = new Date(item.startTime);
      return startTime >= fromDate && startTime <= toDate;
    });
  }
  if (search !== '') {
    filteredData = filteredData.filter((item) =>
      item.driver.toLowerCase().includes(search.toLowerCase())
    );
  }


  return filteredData;
}
