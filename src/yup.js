import * as yup from "yup";
export const vehicleGeneralSchema = yup
  .object({
    branch: yup.string().required(),
    vehicleName: yup.string().required(),
    serverAddress: yup.string(),
    deviceType: yup.string().required("Please select an option"),
    IMEINumber: yup.number().positive().integer().required(),
    simNumber: yup
      .number()
      .positive()
      .integer()
      .required(),
    secondarySimNumber: yup.number().positive().integer(),
    deviceAccuracyTolerance: yup.number().positive().integer().min(0).max(100),
  
  })
  .required();
export const vehicleProfileSchema = yup
  .object({
    DVIRTemplate: yup.string().required("DIVR Template is required !!"),
    purchaseAmount: yup.number().positive().integer(),
    plateNumber: yup.string().required("Plate Number is required !!"),
    registrationNumber: yup
      .number()
      .positive()
      .integer()
      .min(4, "Registration Number must be of 4 digit"),
    passengerSeats: yup.number().positive().integer(),
    distanceCost: yup.number().positive().integer(),
    durationCost: yup.number().positive().integer(),
    GPSWarranty: yup.string().required("GPS Warranty is required !!"),
    weightCapacity: yup.number().positive().integer().required("Weight Capacity is required !!"),
    registrationNumber: yup.number().positive().integer().required("Registration Number is required !!"),
    fuelType: yup.string().required(" Select Fuel Type !!"),
    permit: yup.string().required("Select Permit type !!"),
  })
  .required();

export const forgetpasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const loginValidation = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const resetPassword = yup.object().shape({
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});


export const companyAccountSchema = yup
  .object({
    // branch: yup.string().required(),
    parent: yup.string().required("Please select a option"),
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    zipCode: yup.number().required("Zip Code is required !!"),
    city: yup.string().required('Please enter a City !!'),
    street1: yup.string().required('Please enter street1 address !!'),
    state: yup.string().required("Please select a State"),
    oldPassword: yup.string().min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
    passwordRecoveryEmail: yup.string().email().required("Password Recovery Email is required !!"),
    email: yup.string().email().required("Email is required !!"),
    helpDeskEmail: yup.string().email().required("Help Desk Email is required !!"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    retypePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    whatsappContactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
  .required();

export const branchAccountSchema = yup
  .object({
    // branch: yup.string().required(),
    parentCompany: yup.string().required("Company Name is required !!"),
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    zipCode: yup.number().required("Zip Code is required !!"),
    city: yup.string().required("Please enter a City !!"),
    street1: yup.string().required("Please enter street1 address !!"),
    state: yup.string().required("Please select a State"),
    oldPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    passwordRecoveryEmail: yup
      .string()
      .email()
      .required("Password Recovery Email is required !!"),
    helpDeskEmail: yup
      .string()
      .email()
      .required("Help Desk Email is required !!"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    retypePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    whatsappContactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
  .required();
export const adminProfileAccountSchema = yup
  .object({
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    zipCode: yup.number().required("Zip Code is required !!"),
    city: yup.string().required('Please enter a City !!'),
    street1: yup.string().required('Please enter street1 address !!'),
    state: yup.string().required("Please select a State"),
    oldPassword: yup.string().min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
    passwordRecoveryEmail: yup.string().email().required("Password Recovery Email is required !!"),
    helpDeskEmail: yup.string().email().required("Help Desk Email is required !!"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    retypePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    whatsappContactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
  .required();
export const businessGroupAccountSchema = yup
  .object({
    // branch: yup.string().required(),
    // admin:yup.string().required("Please select the field"),
    userName: yup.string().required("Please enter a User Name"),
    businessUser: yup.string().required("Business Group Name is required !!"),
    country: yup.string().required("Please select a Country"),
    zipCode: yup.number().required("Zip Code is required !!"),
    city: yup.string().required('Please enter a City !!'),
    street1: yup.string().required('Please enter street1 address !!'),
    state: yup.string().required("Please select a State"),
    oldPassword: yup.string(),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    retypePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    passwordRecoveryEmail: yup.string().email().required("Password Recovery Email is required !!"),
    helpDeskEmail: yup.string().email().required("Help Desk Email is required !!"),

    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    whatsappContactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  })
  .required();

export const companySettingSchema = yup
  .object({
    dateFormat: yup.string(),
    timeFormat: yup.string(),
    unitOfDistance: yup.string(),
  })
  .required();

export const driverProfileSchema = yup
  .object({
   branch: yup.string().required("Branch is required !!"),
   employeeDesignation: yup.string().required("Employee Designation is required !!"),
   firstName: yup.string().required("First Name is required !!"),
   lastName: yup.string().required("Last Name is required !!"),
   employeeNumber: yup.number(),
   zipCode: yup.number().required("Zip Code is required !!"),
   contactNumber1: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required("Contact Number1 is required !!"),
   contactNumber2: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
   country: yup.string().required('Please select a Country !!'),
   state: yup.string().required('Please select a State !!'),
   city: yup.string().required('Please enter a City !!'),
   street1: yup.string().required('Please enter street1 address !!'),

  })
  .required();
export const driverInfoSchema = yup
  .object({
   age: yup.number(),
   drivingExperienceSince: yup.number(),
   licenseToDrive: yup.string(),
   licenseNumber: yup.string(),
  })
  .required();
export const subUserAccuntSchema = yup
  .object({
   userName: yup.string().required("User Name is required !!"),
   confirmUserName: yup.string().required("Confirm User Name please !!"),
   password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    retypePassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    email: yup.string().email().required("Email is required !!"),
    country: yup.string().required("Please select a Country"),
    state: yup.string().required("Please select a State"),
    experience: yup.number().required("Experience is required"),
    age: yup.number().min(20, "Age must be at least 20").max(99, "Age must be at most 99"),
    
  })
  .required();
export const alertSchema = yup
  .object({
   branch: yup.string().required("Select a Branch !!"),
   basedOn: yup.string().required("Choose an option !!"),
   object: yup.string().required("Select an option !!"),
   alertName: yup.string().required("Alert Name is required !!"),
   alertType: yup.string().required("Select an Alert Type !!"),
   alertValue: yup.string().required("Choose an Alert Value !!"),
   validDays: yup.string().required("Choose Valid day options !!"),
   severity: yup.string().required("Choose Severity options !!"),
  //  userName: yup.string().required("User Name is required !!"),
  })
  .required();
export const expenseSchema = yup
  .object({
   branch: yup.string().required("Select a Branch !!"),
   category: yup.string().required("Choose a Category !!"),
   type: yup.string().required("Select a type !!"),
   amount: yup.number().required("Enter an Amount !!"),
   fromDate: yup.date().required("Enter the date !!"),
   toDate: yup.date().required("Enter the date !!"),
   referenceNumber: yup.number().required("Reference Number a required !!"),
  //  userName: yup.string().required("User Name is required !!"),
  })
  .required();
export const technicianTaskSchema = yup
  .object({
   branch: yup.string().required("Select a Branch !!"),
   technician: yup.string().required("Select a Technician !!"),
   taskCategory: yup.string().required("Select a Category !!"),
   taskPriority: yup.string().required("Select a task priority !!"),
   taskName: yup.string().required("Task Name is required !!"),
   serviceLocation: yup.string().required("Service Location is required !!"),
   contactPersonNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  })
  .required();
export const geofenceMapSchema = yup
  .object({
   company: yup.string().required("Enter company name !!"),
   name: yup.string().required("Enter Geofence name !!"),
   category: yup.string().required("Select a Category !!"),
   geofenceAccess: yup.string().required("Choose access method !!"),
   contactNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),

  })
  .required();
export const technicianGeneralSchema = yup
  .object({
    firstName: yup.string().required("First Name is required !!"),
    middleName: yup.string(),
    lastName: yup.string().required("Last Name is required !!"),
    technicianNumber: yup.number().required("Technician Number is required !!"),
    mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    emergencyContact: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    dateOfJoin: yup.string().required("Date of join is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    email: yup.string().email("Invalid email").required("Email is required"),

  })
  .required();
export const technicianAddressSchema = yup
  .object({
    zipCode: yup.number().required("Zip Code is required !!"),
    country: yup.string().required('Please select a Country !!'),
    city: yup.string().required('Please enter a City !!'),
    street1: yup.string().required('Please enter street1 address !!'),
  })
  .required();
export const technicianLeaveSchema = yup
  .object({
   leaveTime: yup.string().required("Select type of leave !!"),
   noOfDays: yup.number().required("Enter total number of leaves !!"),

  })
  .required();
export const classifyTripsSchema = yup
  .object({
    startTime: yup.string().required("Trip start time is required !!"),
    startLocation: yup.string().required("Trip start Location is required !!"),
    reachTime: yup.string().required("Trip reach time is required !!"),
    reachLocation: yup.string().required("Trip reach Location is required !!"),
    driver: yup.string().required("Driver name is required !!"),

  })
  .required();
