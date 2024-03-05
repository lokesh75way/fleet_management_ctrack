import * as yup from "yup";
export const vehicleGeneralSchema = yup
  .object({
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
    DVIRTemplate: yup.string(),
    purchaseAmount: yup.number().positive().integer(),
    plateNumber: yup.string(),
    registrationNumber: yup
      .number()
      .positive()
      .integer()
      .min(4, "Registration Number must be of 4 digit"),
    passengerSeats: yup.number().positive().integer(),
    distanceCost: yup.number().positive().integer(),
  })
  .required();
export const companyAccountSchema = yup
  .object({
    // branch: yup.string().required(),
    shortName: yup.string().required("Please enter a Short Name"),
    userName: yup.string().required("Please enter a User Name"),
    country: yup.string().required("Please select a Country"),
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
    passwordRecoveryEmail: yup.string().email(),
    helpDeskEmail: yup.string().email(),

    mobileNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    whatsappContactNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    helpDeskTelephoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
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
   branch: yup.string().required("Select a Branch !!"),
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
    passwordRecoveryEmail: yup.string().email(),
  })
  .required();
