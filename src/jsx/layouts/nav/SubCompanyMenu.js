import { SVGICON } from "../../constant/theme";

export const SubCompanyMenuList = [
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
    to: "/dashboard",
  },
  { title: "User", iconStyle: SVGICON.Employe, to: "/subUser" },
  {
    title: "Sub Branch",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Task,
    to:"branch",
    content: [


    ],
    
  },
  {
    title: "Reports",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Reports,
    content: [
      {
        title: "Activity",
        to: "/reports/activity",
      },
      {
        title: "Geofence-Address",
        to: "/reports/geofence-address",
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
    title: "Tracking",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Task,
    content: [
      {
        title: "Branch",
        to: "branch-tracking",
      },
      {
        title: "Drivers",
        to: "driver-tracking",
      },
    ],
  },
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
    title: "Charts",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Charts,
    content: [
      {
        title: "Activity",
        to: "/charts/activity",
      },
      {
        title: "Alert",
        to: "/charts/alert",
      },
      {
        title: "Fuel",
        to: "/charts/fuel",
      },
      {
        title: "Expense",
        to: "/charts/expense",
      },
      {
        title: "Temperature Chart",
        to: "/charts/temperature-chart",
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
        to: "/groups",
      },
      {
        title: "Alerts",
        to: "/alert",
      },
      {
        title: "Expense",
        to: "/expense",
      },
      {
        title: "Geofence",
        to: "/geofence",
      },
      {
        title: "Classify Trips",
        to: "/classifyTrips",
      },
    ],
  },

    // {
    //     title: 'Manage Clients',
    //     iconStyle: SVGICON.ManageClient,
    //     to: '/manage-client',
    // },

]
