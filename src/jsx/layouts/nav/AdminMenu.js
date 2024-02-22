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
    {
        title: 'Driver',
        iconStyle: SVGICON.Employe,
        to: '/driver',
     },
     {   title: 'Compnay',
        iconStyle: SVGICON.Employe,
        to: '/company',
    },
    {
        title: 'Core HR',
        iconStyle: SVGICON.CoreHr,
        to: '/core-hr',
    },
    {
        title: 'Finance',
        iconStyle: SVGICON.Finance,
        to: '/finance',
    },
    {
        title: 'Performance',
        iconStyle: SVGICON.Performance,
        to: '/performance',
    },
    {
        title: 'Projects',
        iconStyle: SVGICON.ProjectsSidbar,
        to: '/project',
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
    title: "Technical",
    iconStyle: SVGICON.Employe,
    to: "/technical",
  },

    {
        title: 'Manage Clients',
        iconStyle: SVGICON.ManageClient,
        to: '/manage-client',
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