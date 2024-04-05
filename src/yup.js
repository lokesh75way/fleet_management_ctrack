import * as yup from "yup";
export const vehicleGeneralSchema = yup
  .object({
    company: yup.string().required("Company name id required"),
    businessGroupId: yup.string().required("Business group name is required"),
    vehicleName: yup.string().required("Vehicle name is required"),
    serverAddress: yup.string("Server Address is required"),
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
    secondarySimNumber: yup
      .number()
      .positive()
      .integer()
      .typeError("Secondary Sim Number must be a number"),
    deviceAccuracyTolerance: yup
      .number()
      .positive()
      .integer()
      .min(0)
      .max(100)
      .typeError("Device Accuracy Tolerance must be a number"),
  })
  .required();
export const vehicleProfileSchema = yup
  .object({
    DVIRTemplate: yup.string().required("DIVR Template is required "),
    purchaseAmount: yup
      .number()
      .positive()
      .integer()
      .typeError("Purchase Amount must be a number"),
    plateNumber: yup.string().required("Plate Number is required "),
    registrationNumber: yup
      .string()
      .min(4, "Registration Number must be of 4 digit or more"),
    passengerSeats: yup
      .number()
      .positive()
      .integer()
      .typeError("Passenger seats must be a number"),
    distanceCost: yup.number().positive().integer(),
    durationCost: yup.number().positive().integer(),
    GPSWarranty: yup.string().required("GPS Warranty is required "),
    weightCapacity: yup
      .number()
      .positive()
      .integer()
      .typeError("Weight Capacity must be a number")
      .required("Weight Capacity is required "),
    registrationNumber: yup
      .string()
      .typeError("Registration Number must be a string")
      .required("Registration Number is required "),
    fuelType: yup.string().required(" Select Fuel Type "),
    permit: yup.string().required("Select Permit type "),
  })
  .required();

export const vehicleDocumentSchema = yup
  .object({
    test: yup.array().of(
      yup.object().shape({
        fieldName: yup.string().required("This field is required"),
        file: yup
          .mixed()
          .required("File is required")
          .test(
            "fileExist",
            "File is required",
            (value) => value && value.length
          )
          .test("fileSize", "File size is too large", (value) => {
            console.log({ value });
            return value && value.length > 0
              ? value && value[0]?.size <= 1024 * 1024
              : true;
          })
          .test("fileType", "Unsupported file type", (value) => {
            if (value && value.length > 0)
              return (
                value &&
                ["image/jpeg", "image/png", "application/pdf"].includes(
                  value[0]?.type
                )
              );
            return true;
          }),
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
    businessGroupId: yup.string().required("Please select an option"),
    companyName: yup.string().required("Please enter a Company Name"),
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    city: yup.string().required("Please enter a City "),
    street1: yup.string().required("Please enter street1 address "),
    email: yup.string().email().required("Email is required "),
    zipCode: yup
      .number()
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    helpDeskEmail: yup
      .string()
      .email()
      .required("Help Desk Email is required "),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),

    mobileNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits")
      .required("Mobile Number is required"),

    helpDeskTelephoneNumber: yup
      .string()
      .required("Help Desk Telephone Number is required")
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),

    logo: yup
      .mixed()
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        return true;
      }),
  })
  .required();

export const branchAccountSchema = yup
  .object({
    branchName: yup.string().required(),
    companyId: yup.string().required("Company Name is required "),
    businessGroupId: yup.string().required("Business Group Name is required "),
    country: yup.string().required("Please select a Country"),
    zipCode: yup
      .number()
      .positive("Zip Code must be a positive number")
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    city: yup.string().required("Please enter a City "),
    street1: yup.string().required("Please enter street1 address "),

    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
  })
  .required();
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
    oldPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    helpDeskEmail: yup
      .string()
      .email()
      .required("Help Desk Email is required "),
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
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
  })
  .required();
export const businessGroupAccountSchema = yup
  .object({
    // branch: yup.string().required(),
    groupName: yup.string().required("Please enter a Business Group Name"),
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
    city: yup.string().required("Please enter a City "),
    street1: yup.string().required("Please enter street1 address "),
    zipCode: yup
      .number()
      .positive("Zip Code must be a positive number")
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 20 characters"),
    helpDeskEmail: yup
      .string()
      .email()
      .required("Help Desk Email is required "),
    email: yup.string().email().required("Email is required "),

    mobileNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
    helpDeskTelephoneNumber: yup
      .string()
      .matches(/^[0-9]{5,15}$/, "Phone number must be between 5 and 15 digits"),
    logo: yup
      .mixed()
      .test("fileType", "Only JPG or PNG files are allowed", (value) => {
        // console.log(value);
        // if (!value[0]) return true;
        // // if(typeof value === 'string') return true;
        // const extension = value[0].name.split(".").pop().toLowerCase();
        // return extension === "jpg" || extension === "png";
        return true;
      }),
  })
  .required();

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
  oldPassword: yup.string().required("Old password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const driverProfileSchema = yup
  .object({
    companyId: yup.string().required("Company is required "),
    businessGroupId: yup.string().required("Business group is required "),
    branchId: yup.string().required("Branch is required "),
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
        file: yup
          .mixed()
          .required("File is required")
          // .test("fileType", "Unsupported file type", (value) => {
          //   if (value && value.length > 0)
          //     return (
          //       value &&
          //       ["image/jpeg", "image/png", "application/pdf"].includes(
          //         value[0]?.type
          //       )
          //     );
          //   return true;
          // }),
          ,
        issueDate: yup.string().typeError('Issue date is required'),
        expireDate: yup.string().typeError('Expiry date is required'),
      })
    ),
  })
  .required();
export const subUserAccountSchema = yup
  .object({
    isEdit: yup.boolean(),
    userName: yup.string().required("User Name is required "),
    featureTemplateId: yup.string().required("Feature Template is required "),
    password: yup
      .string()
      .test("isEdit", "Password is required", function (value) {
        const { isEdit } = this.parent;
        if (isEdit) {
          return true;
        } else {
          return value && value.length >= 8;
        }
      }),
    confirmPassword: yup
      .string()
      .test("isEdit", "Password is required", function (value) {
        const { isEdit } = this.parent;
        if (isEdit) {
          return true;
        } else {
          return value && value.length >= 8;
        }
      }),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be between 5 and 15 digits"),
    email: yup.string().email().required("Email is required "),
    country: yup.string().required("Please select a Country"),
  })
  .required();
export const alertSchema = yup
  .object({
    branch: yup.string().required("Select a Branch "),
    basedOn: yup.string().required("Choose an option "),
    object: yup.string().required("Select an option "),
    alertName: yup.string().required("Alert Name is required "),
    alertType: yup.string().required("Select an Alert Type "),
    alertValue: yup.string().required("Choose an Alert Value "),
    validDays: yup.string().required("Choose Valid day options "),
    severity: yup.string().required("Choose Severity options "),
    //  userName: yup.string().required("User Name is required "),
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
    fromDate: yup.date().required("Enter the date "),
    toDate: yup.date().required("Enter the date "),
    referenceNumber: yup
      .number()
      .required("Reference Number a required ")
      .typeError("Reference Number must be a number"),
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
    company: yup.string().required("Enter company name "),
    name: yup.string().required("Enter Geofence name "),
    category: yup.string().required("Select a Category "),
    geofenceAccess: yup.string().required("Choose access method "),
    tolerance: yup.string().required("Tolerance value is required "),
    contactNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be between 5 and 15 digits"),
  })
  .required();
export const technicianGeneralSchema = yup
  .object({
    firstName: yup.string().required("First Name is required "),
    middleName: yup.string(),
    lastName: yup.string().required("Last Name is required "),
    technicianNumber: yup
      .number()
      .typeError("Technician Number must be a number")
      .required("Technician Number is required "),
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
    zipCode: yup
      .number()
      .positive("Zip Code must be a positive number")
      .integer("Zip Code must be an integer")
      .nullable(true)
      .transform((_, val) => (val ? Number(val) : null)),
    country: yup.string().required("Please select a Country "),
    city: yup.string().required("Please enter a City "),
    street1: yup.string().required("Please enter street1 address "),
  })
  .required();
export const technicianLeaveSchema = yup
  .object({
    leaveTime: yup.string().required("Select type of leave "),
    noOfDays: yup.number().required("Enter total number of leaves "),
  })
  .required();
export const classifyTripsSchema = yup
  .object({
    startTime: yup.string().required("Trip start time is required "),
    startLocation: yup.string().required("Trip start Location is required "),
    reachTime: yup.string().required("Trip reach time is required "),
    reachLocation: yup.string().required("Trip reach Location is required "),
    driver: yup.string().required("Driver name is required "),
  })
  .required();
