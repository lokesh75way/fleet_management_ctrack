import { SVGICON } from "../../constant/theme";
import { GrMoney } from "react-icons/gr";
import { FaCar } from "react-icons/fa6";
import { FaRegBuilding } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaTools } from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";
import { BsPinMap } from "react-icons/bs";
import { BiTask } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { BiTrip } from "react-icons/bi";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { TbFence } from "react-icons/tb";
import { CgPoll } from "react-icons/cg";

export const CompanyMenuList = [
  //Content
  {
    title: "YOUR COMPANY",
    classsChange: "menu-title",
  },
  //Dashboard
  {
    title: "Dashboard",
    iconStyle: SVGICON.Home,
    to: "/dashboard",
  },
  {
    title: "Branch",
    iconStyle: <FaRegBuilding style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to:"/branch",
  },
  {
    title: "Technician",
    iconStyle: <FaTools style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/technician",
  },
  {
    title: "Driver",
    iconStyle: <GrUserPolice style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/driver",
  },
  {
    title: "Vehicle",
    iconStyle: <FaCar style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/vehicle",
  },
  { title: "User", iconStyle: SVGICON.Employe, to: "/subUser" },
  {
    title: "Driver Tracking",
    iconStyle: <BsPinMap style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "driver-tracking",
  },
  {
    title: "Technician Tasks",
    iconStyle: <BiTask style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/technicianTask",
  },
  {
    title: "Alerts",
    iconStyle: <FiAlertTriangle style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1.5',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/alert",
  },
  {
    title: "Expense",
    iconStyle: <GrMoney style={{ width:"20px",height:"20px",stroke:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}} />,
    to: "/expense",
  },
  {
    title: "Feature Template",
    iconStyle: <PiWarningOctagonDuotone style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/groups",
  },
  {
    title: "Geofence",
    iconStyle: <TbFence style={{ width:"20px",height:"20px",stroke:"#888888",strokeWidth:'1.5',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/geofence",
  },
  {
    title: "Classify Trips",
    iconStyle: <BiTrip style={{ width:"20px",height:"20px",stroke:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/classifyTrips",
  },
  // {
  //   title: "Reports",
  //   iconStyle: <CgPoll style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
  //   to: "/reports",
  // },
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

]
