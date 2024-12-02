import * as yup from "yup";
const EMAIL_REG =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MOBILE_REG = /^([0|\+[0-9]{1,3})?([7-9][0-9]{9})$/;

const password = yup
  .string()
  .trim()
  .matches(/(?=.*[0-9])/, { message: "Must contain atleast digit" })
  .matches(/(^\S+$)/, { message: "Don't use white spaces" })
  .matches(/(?=.*\W)/, { message: "Must contain atleast special character" })
  .matches(/(?=.*[A-Z])/, {
    message: "Must contain atleast one upper case letter",
  })
  .matches(/(?=.*[a-z])/, {
    message: "Must contain atleast one lower case letter",
  })
  .min(8, "Atleast 8 character should be there")
  .max(16, "Maximum 16 characters only allowed");

export const vehicleGeneralSchema = yup
  .object({
    companyId: yup.string().required("Company name id required"),
    businessGroupId: yup.string().required("Business group name is required"),
    vehicleName: yup.string().required("Vehicle name is required"),
    deviceType: yup.string().required("Please select an option"),
    imeiNumber: yup
      .number()
      .positive()
      .integer()
      .required("IMEI Number is required")
      .typeError("IMEI Number must be a number"),
    simNumber: yup
      .number()
      .positive()
      .integer()
      .required("Sim Number is required")
      .typeError("Sim Number must be a number"),
    deviceAccuracyTolerance: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(100)
      .typeError("Device Accuracy Tolerance must be a number"),
    serverAddress: yup
      .string()
      .url("Server address must be a valid URL")
      .required(),
    distanceCounter: yup.string().required("Distance counter is required"),
  })
  .required();
export const vehicleProfileSchema = yup
  .object({
    dvirTemplate: yup.string().required("DIVR Template is required "),
    purchaseAmount: yup
      .number()
      .positive()
      .integer()
      .typeError("Purchase Amount must be a number"),
    // plateNumber: yup.string().required("Plate Number is required "),
    registrationNumber: yup
      .string()
      .min(4, "Registration Number must be of 4 digit or more"),
    passengerSeat: yup
      .number()
      .positive()
      .integer()
      .typeError("Passenger seats must be a number"),
    distanceCostQuantity: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable()
      .positive()
      .integer(),
    durationCostQuantity: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .nullable()
      .positive()
      .integer(),
    // gpsWarranty: yup
    //   .number()
    //   .typeError("Weight Capacity must be a number")
    //   .required("GPS Warranty is required "),
    // weightCapacity: yup
    //   .number()
    //   .positive()
    //   .integer()
    //   .typeError("Weight Capacity must be a number")
    //   .required("Weight Capacity is required "),
    registrationNumber: yup
      .string()
      .typeError("Registration Number must be a string")
      .required("Registration Number is required "),
    fuelType: yup.string().required(" Select Fuel Type "),
    permit: yup.string().required("Select Permit type "),
    vehicleCategory: yup.string().required("Vehicle category is required"),
    vinNumber: yup.number().typeError("VIN number must be a number").required(),
    durationBaseFuelConsumptionDurationQuanitty: yup
      .number()
      .typeError("This field is required")
      .required(),
    distanceBasedDistanceQuantity: yup
      .number()
      .typeError("This field is required")
      .required(),
    // sleepModeDuration: yup
    //   .number()
    //   .typeError("Sleep mode duration must be a number")
    //   .required(),
  })
  .required();

export const vehicleInformationSchema = yup
  .object({
    selectedInput: yup.string().required("Please select an option"),
    registrationNumber: yup.string().when("selectedInput", {
      is: "registrationNumber",
      then: () => yup.string().required("Registration Number is required"),
      otherwise: () => yup.string().optional(),
    }),
    fleetnumber: yup.string().when("selectedInput", {
      is: "fleetnumber",
      then: () => yup.string().required("fleet Number is required"),
      otherwise: () => yup.string().optional(),
    }),
  })
  .required();

export const vehicleDocumentSchema = yup
  .object({
    documents: yup.array().of(
      yup.object().shape({
        documentType: yup.string().required("This field is required"),
        file: yup.string(),
      })
    ),
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
  newPassword: password.required("New Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export const companyAccountSchema = (id) =>
  yup.object({
    // branch: yup.string().required(),
    businessGroupId: yup.string().required("Please select an option"),
    companyName: yup.string().trim().required("Please enter a Company Name"),
    tradeLicenseNumber: yup.string().trim(),
    officeNumber: yup
      .string()
      .trim()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .matches(MOBILE_REG, { message: "Enter valid number" }),
    country: yup.string().trim().required("Please select a Country"),
    state: yup.string().trim(),
    email: yup
      .string()
      .trim()
      .email("Enter valid email")
      .matches(EMAIL_REG, { message: "Enter valid email" })
      .required("Please enter email"),
    city: yup.string().trim().required("Please enter a City"),
    dateFormat: yup.string().trim().required("Please select a Date Format"),
    timeFormat: yup.string().trim().required("Please select a Time Format"),
    timezone: yup.string().trim(),
    userName: yup.string().trim().required("Please enter a Username"),
    password: yup.string().when([], {
      is: () => !!id,
      then: () =>
        password
          .nullable()
          .transform((curr, orig) => (orig === "" ? null : curr)),
      otherwise: () => password.required("Password required"),
    }),
    userInfo: yup.array().of(
      yup.object().shape({
        name: yup.string().trim().required("Please enter a Name"),
        designation: yup.string().trim().required("Please enter a Designation"),
        mobileNumber: yup
          .string()
          .trim()
          .required("Please enter a Mobile Number")
          .matches(MOBILE_REG, { message: "Enter valid number" }),
        email: yup
          .string()
          .trim()
          .email("Enter valid email")
          .matches(EMAIL_REG, { message: "Enter valid email" })
          .required("Email is required"),
      })
    ),
  });

export const branchAccountSchema = yup.object({
  branchName: yup.string().trim().required(),
  companyId: yup.string().trim().required("Company Name is required "),
  businessGroupId: yup
    .string()
    .trim()
    .required("Business Group Name is required "),
  tradeLicenseNumber: yup.string().trim(),
  officeNumber: yup
    .string()
    .trim()
    .matches(MOBILE_REG, { message: "Enter valid number" }),
  country: yup.string().trim().required("Please select a Country"),
  state: yup.string().trim(),
  email: yup
    .string()
    .trim()
    .email("Enter valid email")
    .matches(EMAIL_REG, { message: "Enter valid email" })
    .required("Please enter email"),
  city: yup.string().trim().required("Please enter a City"),
  dateFormat: yup.string().trim().required("Please select a Date Format"),
  timeFormat: yup.string().trim().required("Please select a Time Format"),
  timezone: yup.string().trim(),
  userInfo: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required("Please enter a Name"),
      designation: yup.string().trim().required("Please enter a Designation"),
      mobileNumber: yup
        .string()
        .trim()
        .required("Please enter a Mobile Number")
        .matches(MOBILE_REG, { message: "Enter valid number" }),
      email: yup
        .string()
        .trim()
        .email("Enter valid email")
        .matches(EMAIL_REG, { message: "Enter valid email" })
        .required("Email is required"),
    })
  ),
});
export const adminProfileAccountSchema = yup
  .object({
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    zipCode: yup
      .number()
      .positive("Zip Code must be a positive number")
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    city: yup.string().required("Please enter a City "),
    street1: yup.string().required("Please enter street1 address "),
    email: yup.string().email().required("Email is required "),
    oldPassword: yup.string().trim().required("Please type old password"),
    helpDeskEmail: yup
      .string()
      .email()
      .required("Help Desk Email is required "),
    newPassword: password.required(),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
  })
  .required();

export const businessGroupAccountSchema = (id) =>
  yup.object({
    // Add validation rules for each field
    groupName: yup
      .string()
      .trim()
      .required("Please enter a Business Group Name"),
    tradeLicenseNumber: yup.string().trim(),
    officeNumber: yup
      .string()
      .trim()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .matches(MOBILE_REG, { message: "Enter valid number" }),
    country: yup.string().trim().required("Please select a Country"),
    state: yup.string().trim(),
    email: yup
      .string()
      .trim()
      .email("Valid email required")
      .matches(EMAIL_REG, { message: "Enter valid email" })
      .required("Enter valid email"),
    city: yup.string().trim().required("Please enter a City"),
    dateFormat: yup.string().trim().required("Please select a Date Format"),
    timeFormat: yup.string().trim().required("Please select a Time Format"),
    timezone: yup.string().trim(),
    userName: yup.string().trim().required("Please enter a Username"),
    password: yup.string().when([], {
      is: () => !!id,
      then: () =>
        password
          .nullable()
          .transform((curr, orig) => (orig === "" ? null : curr)),
      otherwise: () => password.required("Password required"),
    }),
    // Add validation for user details within formData array
    userInfo: yup.array().of(
      yup.object().shape({
        name: yup.string().trim().required("Please enter a Name"),
        designation: yup.string().trim().required("Please enter a Designation"),
        mobileNumber: yup
          .string()
          .trim()
          .required("Please enter a Mobile Number")
          .matches(MOBILE_REG, { message: "Enter valid number" }),
        email: yup
          .string()
          .trim()
          .email("Enter valid email")
          .matches(EMAIL_REG, { message: "Enter valid email" })
          .required("Email is required"),
      })
    ),
  });

export const businessGroupSettingSchema = yup
  .object({
    dateFormat: yup.string(),
    timeFormat: yup.string(),
    unitOfDistance: yup.string(),
    file: yup
      .mixed()
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        return true;
      }),
  })
  .required();

export const companySettingSchema = yup
  .object({
    dateFormat: yup.string(),
    timeFormat: yup.string(),
    unitOfDistance: yup.string(),
    file: yup
      .mixed()
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        return true;
      }),
  })
  .required();

export const companyPasswordSchema = yup.object({
  oldPassword: yup.string().trim().required("Old password is required"),

  newPassword: password.required("New password is required"),

  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const driverProfileSchema = yup
  .object({
    companyId: yup.string().required("Company is required "),
    businessGroupId: yup.string().required("Business group is required "),
    firstName: yup.string().required("First Name is required "),
    lastName: yup.string().required("Last Name is required "),
    employeeNumber: yup.number().typeError("Employee Number must be a number"),
    zipCode: yup
      .number()
      .positive("Zip Code must be a positive number")
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    contact1: yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be between 5 and 15 digits")
      .required("Contact Number1 is required "),
    contact2: yup
      .string()
      .matches(/^[0-9]{10}$/, "Contact number must be between 5 and 15 digits"),
    country: yup.string().required("Please select a Country "),
    street1: yup.string().required("Please enter street1 address"),
    street2: yup.string(),
    city: yup.string().required("Please enter a City "),
    state: yup.string(),
  })
  .required();
export const driverInfoSchema = yup
  .object({
    dateOfBirth: yup.date().nullable(),
    age: yup
      .number()
      .typeError("Age must be a number")
      .required("Age is required"),
    dateOfJoining: yup.date().nullable(),
    dateOfLeaving: yup.date().nullable(),
    drivingExperience: yup
      .number()
      .typeError("Driving experience must be a number")
      .required("Driving experience is required"),
    licenseToDrive: yup.string(),
    licenseNumber: yup.string(),
    licenseIssueDate: yup.date().nullable(),
    licenseExpiryDate: yup.date().nullable(),
    lifeInsuranceNumber: yup.string().typeError("Insurance must be a number"),
    lifeInsuranceExpiry: yup.date().nullable(),
    mediclaimNumber: yup.string().typeError("Medical claim must be a number"),
    mediclaimExpiryDate: yup.date().nullable(),
  })
  .required();
export const driverDocumentSchema = yup
  .object({
    documents: yup.array().of(
      yup.object().shape({
        documentType: yup.string().required("This field is required"),
        file: yup.string(),
      })
    ),
  })
  .required();
export const subUserAccountSchema = yup.object({
  isEdit: yup.boolean(),
  userName: yup.string().required("User Name is required "),
  featureTemplateId: yup.string().required("Feature Template is required "),
  password: yup
    .string()
    .test("password", "Password is required", function (value) {
      const { isEdit } = this.parent;
      if (isEdit) {
        return true;
      } else {
        return value && value.length >= 8;
      }
    }),
  confirmPassword: yup
    .string()
    .test("confirmPassword", "Password is required", function (value) {
      const { isEdit } = this.parent;
      if (isEdit) {
        return true;
      } else {
        return value && value.length >= 8;
      }
    }),
  mobileNumber: yup
    .string()
    .trim()
    .matches(MOBILE_REG, { message: "Enter valid number" }),
  email: yup.string().email().required("Email is required "),
  country: yup.string().required("Please select a Country"),
});
export const subUserEditAccountSchema = yup.object({
  isEdit: yup.boolean(),
  userName: yup.string().required("User Name is required "),
  featureTemplateId: yup.string().required("Feature Template is required "),
  mobileNumber: yup
    .string()
    .trim()
    .matches(MOBILE_REG, { message: "Enter valid number" }),
  email: yup.string().email().required("Email is required "),
  country: yup.string().required("Please select a Country"),
});
export const alertSchema = yup
  .object({
    branch: yup.array().required("Select at least one option"),
    basedOn: yup.string().required("Choose an option"),
    object: yup.string().required("Select an option"),
    alertName: yup.string().required("Alert Name is required"),
    alertType: yup.string().required("Select an Alert Type"),
    value: yup.string().required("Choose an Alert Value"),
    validDays: yup.string().required("Choose Valid day options"),
    severity: yup.string().required("Choose Severity options"),
  })
  .required();
export const expenseSchema = yup
  .object({
    branch: yup.string().required("Select a Branch "),
    category: yup.string().required("Choose a Category "),
    type: yup.string().required("Select a type "),
    amount: yup
      .number()
      .required("Enter an Amount ")
      .typeError("Amount must be a number"),
    fromDate: yup.date(),
    toDate: yup.date(),
    expenseDate: yup.date().required("Expense date is required"),
    referenceNumber: yup
      .number()
      .required("Reference Number a required ")
      .typeError("Reference Number must be a number"),
    odometer: yup
      .number()
      .typeError("Odometer Number must be a number")
      .optional(),
    workHour: yup
      .string()
      .typeError("WorkHour Number must be valid")
      .optional(),
    //  userName: yup.string().required("User Name is required "),
  })
  .required();
export const technicianTaskSchema = yup
  .object({
    technician: yup.string().required("Select a Technician "),
    taskCategory: yup.string().required("Select a Category "),
    taskPriority: yup.string().required("Select a task priority "),
    taskName: yup.string().required("Task Name is required "),
    serviceLocation: yup.string().required("Service Location is required "),
    reportingTime: yup.string().required("Reporting Time is required "),
    plannedReportingDate: yup.string().required("Reporting Date is required "),
  })
  .required();
export const geofenceMapSchema = yup
  .object({
    company: yup.string().required("Parent company required"),
    name: yup.string().required("Enter Geofence name "),
    category: yup.string().required("Select a Category "),
    geofenceAccess: yup.string().required("Choose access method "),
    tolerance: yup.string().required("Tolerance value is required "),
    contactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be between 5 and 15 digits"),
    location: yup.array().required("Geofence location required"),
  })
  .required();
export const technicianGeneralSchema = yup
  .object({
    company: yup.string().required("Select a company"),
    firstName: yup.string().required("First Name is required "),
    middleName: yup.string(),
    lastName: yup.string().required("Last Name is required "),
    technicianNo: yup
      .number()
      .typeError("Technician Number must be a number")
      .required("Technician Number is required "),
    gender: yup.string().required("This field is required"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
    emergencyContact: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    dateOfJoin: yup.string().required("Date of join is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();
export const technicianAddressSchema = yup
  .object({
    address: yup
      .object({
        zipCode: yup
          .number()
          .positive("Zip Code must be a positive number")
          .integer("Zip Code must be an integer")
          .transform((_, val) => (val ? Number(val) : null))
          .required("Please select zipcode "),
        country: yup.string().required("Please select a Country "),
        city: yup.string().required("Please enter a City "),
        street1: yup.string().required("Please enter street1 address "),
      })
      .required(),
  })
  .required();
export const technicianLeaveSchema = yup
  .object()
  .shape({
    noOfDaysCL: yup
      .number()
      .typeError("No of Days must be a number")
      .positive("No of Days must be a positive number")
      .integer("No of Days must be an integer")
      .required("No of Days for Casual Leave is required"),
    noOfDays: yup
      .number()
      .typeError("No of Days must be a number")
      .positive("No of Days must be a positive number")
      .integer("No of Days must be an integer")
      .required("No of Days for Sick Leave is required"),
    noOfDaysPL: yup
      .number()
      .typeError("No of Days must be a number")
      .positive("No of Days must be a positive number")
      .integer("No of Days must be an integer")
      .required("No of Days for Privilege Leave is required"),
  })
  .required();

export const classifyTripsSchema = yup
  .object({
    startTime: yup.string().required("Trip start Location is required "),
    reachTime: yup.string().required("Trip reach Location is required "),
    driver: yup.string().required("Driver name is required "),
  })
  .required();

export const classifyTripsFilterCanvas = yup
  .object({
    driverId: yup.string().required("Driver name is required "),
    startDate: yup.string().required("Start date is required "),
    endDate: yup.string().required("End date is required "),
  })
  .required();
