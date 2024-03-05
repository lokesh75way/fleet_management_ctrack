import { SVGICON } from "../../constant/theme";
export const AdminMenuList = [
  //Content
  {
    title: "YOUR COMPANY",
    classsChange: "menu-title",
  },
  //Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Home,
  },
  { title: "Company", iconStyle: SVGICON.Employe, to: "/company" },
  { title: "SubUser", iconStyle: SVGICON.Employe, to: "/subUser" },
  {
    title: "Driver",
    iconStyle: SVGICON.Employe,
    to: "/driver",
  },
  {
    title: "Vehicle",
    iconStyle: SVGICON.Employe,
    to: "/vehicle",
  },
  {
    title : "Business Group",
    to: "user-groups",
    iconStyle : SVGICON.Employe
  },
  {
    title: "Branches",
    iconStyle: SVGICON.Employe,
    to: "branch",
  },
  {
    title: "Tracking",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Task,
    content: [
      {
        title: "Companies",
        to: "company-tracking",
      },
      {
        title: "Drivers",
        to: "driver-tracking",
      },
    ],
  },
  {
    title: "Reports",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Reports,
    content: [
      {
        title: "Reports",
        to: "/reports",
      },
      {
        title: "Activity",
        to: "/reports/activity",
      },
      {
        title: "Geofence-Address",
        to: "/reports/geofence-address",
      },

      {
        title: "Fuel",
        to: "/reports/fuel",
      },

      {
        title: "Temperature",
        to: "/reports/temperature",
      },
      {
        title: "Driver Behaviour",
        to: "/reports/driver-behaviour",
      },
    ],
  },

  {
    title: "Technician",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Employe,
    content: [
      {
        title: "Technician Details",
        to: "/technician",
      },
      {
        title: "Technician Tasks",
        to: "/technicianTask",
      },
    ],
  },
  {
    title: "Settings",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.SettingMenu,
    content: [
      {
        title: "Feature Templates",
        iconStyle: SVGICON.ManageClient,
        to: "/groups",
      },
      {
        title: "Alert",
        to: "/alert",
      },
      {
        title: "Expense",
        to: "/expense",
      },
      {
        title: "General",
        to: "general",
      },
      {
        title: "Master",
        to: "master",
      },
      {
        title: "Technician",
        to: "technician",
      },
      {
        title: "Geofence",
        iconStyle: SVGICON.ManageClient,
        to: "/geofence",
      },
      {
        title: "Classify Trips",
        iconStyle: SVGICON.ManageClient,
        to: "/classifyTrips",
      },
    ],
  },
];
