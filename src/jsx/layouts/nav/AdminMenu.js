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
export const AdminMenuList = [
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
    title: "Business Group",
    iconStyle: SVGICON.BusinessGroup,
    to: "/business",
  },
  {
    title: "Company",
    iconStyle: (
      <HiOutlineBuildingOffice2
        style={{
          width: "22px",
          height: "22px",
          stroke: "#888888",
          color: "#888888",
          strokeWidth: "1.5",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    to: "/company",
  },
  {
    title: "Branch",
    iconStyle: (
      <FaRegBuilding
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
    to: "/branch",
  },
  { title: "User", iconStyle: SVGICON.Employe, to: "/subUser" },
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
  // {
  //   title: "Company Tracking",
  //   iconStyle: (
  //     <BsPinMap
  //       style={{
  //         width: "20px",
  //         height: "20px",
  //         stroke: "#888888",
  //         color: "#888888",
  //         strokeWidth: "1",
  //         clipRule: "evenodd",
  //         fillRule: "evenodd",
  //       }}
  //     />
  //   ),
  //   to: "company-tracking",
  // },
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
    to: "/reports",
  },
  {
    title: "Feature Template",
    iconStyle: (
      <PiWarningOctagonDuotone
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
    to: "/groups",
  },
  {
    title: "Alerts",
    iconStyle: (
      <FiAlertTriangle
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          color: "#888888",
          strokeWidth: "1.5",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    to: "/alert",
  },
  {
    title: "Expense",
    iconStyle: (
      <GrMoney
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          strokeWidth: "1",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    to: "/expense",
  },

  {
    title: "Geofence",
    iconStyle: (
      <TbFence
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          strokeWidth: "1.5",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    to: "/geofence",
  },
  {
    title: "Classify Trips",
    iconStyle: (
      <BiTrip
        style={{
          width: "20px",
          height: "20px",
          stroke: "#888888",
          strokeWidth: "1",
          clipRule: "evenodd",
          fillRule: "evenodd",
        }}
      />
    ),
    to: "/classifyTrips",
  },
];
