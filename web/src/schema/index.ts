import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const OfficialSchema = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  position: yup.string().required("This field is required"),
  achievements: yup.string().required("This field is required"),
  startTerm: yup.date().required("This field is required").nullable(),
  endTerm: yup.date().optional(),
});

export const ProjectsSchema = yup.object().shape({
  officialId: yup.number().min(1).required("This field is required"),
  position: yup.string().optional(),
  members: yup
    .array()
    // .length(2, "Please select atleast two members") // Ensures the array has exactly two items
    .required("This field is required"),
  projectName: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  startDate: yup.date().required("This field is required").nullable(),
  endDate: yup.date().optional(),
  status: yup.string().required("This field is required"),
});

export const requestReportSchema = yup.object().shape({
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
  requestType: yup.string().optional(),
});

export const ResidentSchema = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  civilStatus: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  contact: yup
    .string()
    .matches(/^\d{10,10}$/, "Contact number must be 10 digits")
    .required("This field is required"),
  address: yup.string().required("This field is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});

export const RequestSchema = yup.object().shape({
  residentId: yup.number().min(1).required("This field is required"),
  requestType: yup.string().required("This field is required"),
  purpose: yup.string().required("This field is required"),
  status: yup.string().optional(),
});

export const RequestResidentSchema = yup.object().shape({
  requestType: yup.string().required("This field is required"),
  purpose: yup.string().required("This field is required"),
  status: yup.string().optional(),
});

export const RejectionSchema = yup.object().shape({
  rejectionReason: yup.string().required("This field is required"),
});

export const EventSchema = yup.object().shape({
  // eventImage: yup
  //   .mixed<File>()
  //   .nullable()
  //   .required("This field is required")
  //   .test("fileSize", "File size must be less than 2MB", (value) => {
  //     if (!value) return true; // Skip validation if no file is selected
  //     return value.size <= 2 * 1024 * 1024; // Check if file is less than 2MB
  //   })
  //   .test("fileType", "Only JPG and PNG formats are allowed", (value) => {
  //     if (!value) return true; // Skip validation if no file is provided
  //     return ["image/jpeg", "image/png"].includes(value.type); // Check file type
  //   }),
  eventName: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  eventDate: yup.date().required("This field is required"),
  location: yup.string().required("This field is required"),
});
