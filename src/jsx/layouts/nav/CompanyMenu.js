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
  { title: "User", iconStyle: SVGICON.Employe, to: "/user" },
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
    url : '/technician',
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
    title: "Vehicle",
    iconStyle: (
      <FaCar
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
    to: "/vehicle",
  },
  {
    title: "Driver",
    iconStyle: (
      <GrUserPolice
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
    to: "/driver",
  },
  {
    title: "Vehicle Tracking",
    iconStyle: (
      <BsPinMap
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
    to: "/vehicle-tracking",
  },
 
  {
    title: "Feature Template",
    iconStyle: <PiWarningOctagonDuotone style={{ width:"20px",height:"20px",stroke:"#888888", color:"#888888",strokeWidth:'1',clipRule:"evenodd", fillRule:"evenodd"}}/>,
    to: "/groups",
  },
  {
    title: "Settings",
    url : "/settings",
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
    url : '/reports',
    content: [
      {
        title: "Activity",
        to: "/reports/activity",
      },
      {
        title: "Alert",
        to: "/reports/alert",
      },
      {
        title: "Fuel",
        to: "/reports/fuel",
      },
      
      {
        title: "Trip Classification",
        to: "/reports/trip-classification",
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
      {
        title: "Billing",
        to: "/reports/billing",
      },
    ],
  },

]
