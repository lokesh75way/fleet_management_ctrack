import { SVGICON } from "../../constant/theme";
export const BusinessGroupMenuList = [
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
    title: "Company",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Employe,
    to:"/company",
    content: [
      {
        title: "Alerts",
        
        iconStyle: SVGICON.ManageClient,
        to: "/alert",
      },
      {
        title: "Expense",
        iconStyle: SVGICON.ManageClient,
        to: "/expense",
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
  {
    title: "Branch",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.Employe,
    to:"/branch",
    content: [
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
    ],
  },
  {
    title: "Settings",
    classsChange: "mm-collapse",
    iconStyle: SVGICON.SettingMenu,
    content: [
      {
        title: "Feature Template",
        iconStyle: SVGICON.ManageClient,
        to: "/groups",
      },
      // {
      //   title: "General",
      //   to: "general",
      // },
      // {
      //   title: "Master",
      //   to: "master",
      // },
      // {
      //   title: "Technician",
      //   to: "technician",
      // },
    ],
  },
];
