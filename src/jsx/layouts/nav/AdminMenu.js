import { SVGICON } from "../../constant/theme";
export const AdminMenuList = [
    //Content
    {
        title: 'YOUR COMPANY',
        classsChange: 'menu-title'
    },
    //Dashboard
    {
        title: 'Dashboard',
        classsChange: 'mm-collapse',
        iconStyle: SVGICON.Home,
    },
    {   title: 'Company',
       iconStyle: SVGICON.Employe,
       to: '/company',
   },
    {   title: 'SubUser',
       iconStyle: SVGICON.Employe,
       to: '/subUser',
    },
    {
        title: 'Driver',
        iconStyle: SVGICON.Employe,
        to: '/driver',
     },
    {
        title: 'Vehicle',
        iconStyle: SVGICON.Employe,
        to: '/vehicle',
     },
    {
        title: 'Tracking',
        classsChange: 'mm-collapse',
        iconStyle: SVGICON.Task,
        content: [
            {
                title: 'Companies',
                to: 'company-tracking',
            },
            {
                title: 'Drivers',
                to: 'driver-tracking',
            },
        ]
    },
  {
    title: "Reports",
    iconStyle: SVGICON.Reports,
    to: "/reports",
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
    // {
    //     title: 'Manage Clients',
    //     iconStyle: SVGICON.ManageClient,
    //     to: '/manage-client',
    // },
    {
        title: 'Groups',
        iconStyle: SVGICON.ManageClient,
        to: '/groups',
    },
    {
        title: 'Alerts',
        iconStyle: SVGICON.ManageClient,
        to: '/alert',
    },
    {
        title: 'Expense',
        iconStyle: SVGICON.ManageClient,
        to: '/expense',
    },
    {
        title: 'Geofence',
        iconStyle: SVGICON.ManageClient,
        to: '/geofence',
    },
    {
        title: 'Classify Trips',
        iconStyle: SVGICON.ManageClient,
        to: '/classifyTrips',
    },
    {
        title: 'Alerts',
        iconStyle: SVGICON.ManageClient,
        to: '/alert',
    },
    {
        title: 'Expense',
        iconStyle: SVGICON.ManageClient,
        to: '/expense',
    },
    {
        title: 'Geofence',
        iconStyle: SVGICON.ManageClient,
        to: '/geofence',
    },
    {
        title: 'Classify Trips',
        iconStyle: SVGICON.ManageClient,
        to: '/classifyTrips',
    },
    {
        title: 'Settings',
        classsChange:'mm-collapse',
        iconStyle: SVGICON.SettingMenu,
        content:[
            {
                title:'General',
                to: 'general'
            },
            {
                title:'Master',
                to: 'master'
            },
            {
                title:'Technician',
                to: 'technician'
            }
        ]
    },
];
