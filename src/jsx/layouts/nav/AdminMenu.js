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
        title: 'Compnay',
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
        title: 'Reports',
        iconStyle: SVGICON.Reports,
        to: '/reports',
    },

    {
        title: 'Manage Clients',
        iconStyle: SVGICON.ManageClient,
        to: '/manage-client',
    },

]