import { SVGICON } from "../../constant/theme";

export const CompanyMenuList = [
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
        title: 'Companies',
        iconStyle: SVGICON.Employe,
        to: '/companies',
    },
    {
        title: 'Sub Companies',
        iconStyle: SVGICON.Employe,
        to: '/sub-company',
    },
    {
        title: 'Driver',
        iconStyle: SVGICON.Employe,
        to: '/driver',
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
        title: 'Technical',
        iconStyle: SVGICON.Employe,
        to: '/technical',
    },

    {
        title: 'Manage Clients',
        iconStyle: SVGICON.ManageClient,
        to: '/manage-client',
    },

]