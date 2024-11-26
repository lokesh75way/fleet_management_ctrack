import { FaTools } from "react-icons/fa";
import { SVGICON } from "../../constant/theme";
import { CgPoll } from "react-icons/cg";

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
  { title: "User", iconStyle: SVGICON.Employe, to: "/user" },
  {
    title: "Sub Branch",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Task,
    to: "branch",
    content: [],
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
        to: "vehicle-tracking",
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

  // {
  //   title: "Charts",
  //   classsChange: "mm-collapse",
  //   iconStyle: SVGICON.Charts,
  //   content: [
  //     {
  //       title: "Activity",
  //       to: "/charts/activity",
  //     },
  //     {
  //       title: "Alert",
  //       to: "/charts/alert",
  //     },
  //     {
  //       title: "Fuel",
  //       to: "/charts/fuel",
  //     },
  //     {
  //       title: "Expense",
  //       to: "/charts/expense",
  //     },
  //     {
  //       title: "Temperature Chart",
  //       to: "/charts/temperature-chart",
  //     },
  //   ],
  // },
  {
    title: "Technician",

    iconStyle: (
      <FaTools
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          color: "#888888",
          strokeWidth: "1",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    url: "/technician",
    content: [
      {
        title: "Technician Details",
        to: "/technician/details",
      },
      {
        title: "Technician Tasks",
        to: "/technician/tasks",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    iconStyle: SVGICON.SettingMenu,
    content: [
      {
        title: "Alerts",
        to: "/settings/alert",
      },

      {
        title: "Expense",
        to: "/settings/expense",
      },
      {
        title: "Geofence",
        to: "/settings/geofence",
      },

      {
        title: "Classify Trips",
        to: "/settings/classifyTrips",
      },
    ],
  },
  {
    title: "Reports",
    iconStyle: (
      <CgPoll
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          color: "#888888",
          strokeWidth: "1",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    url: "/reports",
    content: [
      {
        title: "Activity",
        to: "/reports/activity",
      },
      {
        title: "Reports",
        to: "/reports/generated",
      },
      {
        title: "Geofence-Address",
        to: "/reports/geofence-address",
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
  // {
  //     title: 'Manage Clients',
  //     iconStyle: SVGICON.ManageClient,
  //     to: '/manage-client',
  // },
];
