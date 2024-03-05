import * as yup from "yup";

export const vehicleSchema = yup
  .object({
    vehicleName: yup.string().required(),
    serverAddress: yup.string(),
    deviceType: yup.string().required("Please select an option"),
    IMEINumber: yup.number().positive().integer().required(),
    simNumber: yup
      .number()
      .positive()
      .integer()
      .min(18, "Sim Number must be of length between 18 to 22")
      .max(22, "Sim Number must be of length between 18 to 22")
      .required(),
    secondarySimNumber: yup.number().positive().integer().min(18).max(22),
    deviceAccuracyTolerance: yup.number().positive().integer().min(0).max(100),
    purchaseAmount: yup.number().positive().integer(),
    DVIRTemplate: yup.string(),
    plateNumber: yup.string(),
    purchaseAmount: yup.number().positive().integer(),
    registrationNumber: yup
      .number()
      .positive()
      .integer()
      .min(4, "Registration Number must be of 4 digit"),
    passengerSeats: yup.number().positive().integer(),
    distanceCost: yup.number().positive().integer(),
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
