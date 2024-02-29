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
        to: '/dashboard',
    },
    {
        title: 'Sub Companies',
        iconStyle: SVGICON.Employe,
        to: '/sub-company',
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
                title: 'Sub Companies',
                to: 'sub-company-tracking',
            },
            {
                title: 'Drivers',
                to: 'driver-tracking',
            },
            
        ]
    },
    {
        title: 'Reports',
        classsChange:'mm-collapse',
        iconStyle: SVGICON.Reports,
        content:[
            {
                title:'Activity',
                to: '/reports/activity'
            },
            {
                title:'Geofence-Address',
                to: '/reports/geofence-address'
            },
            {
                title:'Sensor',
                to: '/reports/sensor'
            },
            {
                title:'Alert',
                to: '/reports/alert'
            },
            {
                title:'Reminder',
                to: '/reports/reminder'
            },
            {
                title:'Expense',
                to: '/reports/expense'
            },
            {
                title:'Fuel',
                to: '/reports/fuel'
            },
            {
                title:'RPM',
                to: '/reports/rpm'
            },
            {
                title:'Temperature',
                to: '/reports/temperature'
            },
            {
                title:'Driver Behaviour',
                to: '/reports/driver-behaviour'
            },
            {
                title:'OBD',
                to: '/reports/obd'
            },
            {
                title:'Billing',
                to: '/reports/billing'
            },
            {
                title:'Customized',
                to: '/reports/customized'
            },
            {
                title:'Logs',
                to: '/reports/logs'
            },
            {
                title:'Hardware Maintenance',
                to: '/reports/hardware-maintenance'
            },
            {
                title:'Elock',
                to: '/reports/elock'
            },
            {
                title:'Trip Classification',
                to: '/reports/trip-classification'
            },
        ]
    },
    {
        title: 'Charts',
        classsChange:'mm-collapse',
        iconStyle: SVGICON.Charts,
        content:[
            {
                title:'Activity',
                to: '/charts/activity'
            },
            {
                title:'Alert',
                to: '/charts/alert'
            },
            {
                title:'Fuel',
                to: '/charts/fuel'
            },
            {
                title:'Expense',
                to: '/charts/expense'
            },
            {
                title:'Temperature Chart',
                to: '/charts/temperature-chart'
            },
        ]
    },
    {
        title: 'Technician',
        iconStyle: SVGICON.Employe,
        to: '/technician',
    },
    {
        title: "Technician Tasks",
        iconStyle: SVGICON.Employe,
        to: "/technicianTask",
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

]