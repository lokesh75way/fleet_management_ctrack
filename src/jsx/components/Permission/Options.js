export const groupsData = [{ groupName: "", groupPermissions: [] }];

export const staticoptions = [
  {
    name: "Dashboard",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Business Groups",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Companies",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Branches",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Driver",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Vehicle Tracking",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Reports",
    submodules: [
    ],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Geofence",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  {
    name: "Classify Trips",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },

  {
    name: "Alert",
    submodules: [],
    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  // {
  //   name: "Fuel",
  //   permissions: {
  //     add: false,
  //     view: false,
  //     modify: false,
  //     delete: false,
  //     
  //   },
  // },
  {
    name: "Expense",
    submodules: [],

    permissions: {
      add: false,
      view: false,
      modify: false,
      delete: false,
      
    },
  },
  // {
  //   name: "Temperature Chart",
  //   permissions: {
  //     add: false,
  //     view: false,
  //     modify: false,
  //     delete: false,
  //     
  //   },
  //   //   },
  //   // ],
  // },
  {
    name: "Technician",
    submodules: [
      {
        name: "Technician Details",
        permissions: {
          add: false,
          view: false,
          modify: false,
          delete: false,
          
        },
      },
      {
        name: "Technician Tasks",
        permissions: {
          add: false,
          view: false,
          modify: false,
          delete: false,
          
        },
      },
    ],
  },
];

export const reset = JSON.parse(JSON.stringify(staticoptions));
