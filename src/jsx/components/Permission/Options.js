export const groupsData = [{ groupName: "", groupPermissions: [] }];

export const staticoptions = [
  {
    name: "Dashboard",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Business Groups",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Companies",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Branches",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Driver",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Vehicle Tracking",
    submodules: [
      {
        name: "Vechicle Tracking",
        permissions: {
          add: true,
          view: true,
          modify: true,
          delete: true,
          export: true,
        },
      },
    ],
  },
  {
    name: "Reports",
    submodules: [
     
    ],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },

  {
    name: "Geofence",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  {
    name: "Classify Trips",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },

  {
    name: "Alert",
    submodules: [],
    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  // {
  //   name: "Fuel",
  //   permissions: {
  //     add: true,
  //     view: true,
  //     modify: true,
  //     delete: true,
  //     export: true,
  //   },
  // },
  {
    name: "Expense",
    submodules: [],

    permissions: {
      add: true,
      view: true,
      modify: true,
      delete: true,
      export: true,
    },
  },
  // {
  //   name: "Temperature Chart",
  //   permissions: {
  //     add: true,
  //     view: true,
  //     modify: true,
  //     delete: true,
  //     export: true,
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
          add: true,
          view: true,
          modify: true,
          delete: true,
          export: true,
        },
      },
      {
        name: "Techinian Tasks",
        permissions: {
          add: true,
          view: true,
          modify: true,
          delete: true,
          export: true,
        },
      },
    ],
  },
];

export const reset = JSON.parse(JSON.stringify(staticoptions));
