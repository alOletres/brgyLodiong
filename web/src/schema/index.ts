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
  projectName: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  startDate: yup.date().required("This field is required").nullable(),
  endDate: yup.date().optional(),
});

export const ResidentSchema = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  contact: yup.number().required("This field is required"),
  address: yup.string().required("This field is required"),
  password: yup.string().required("This field is required"),
});

export const RequestSchema = yup.object().shape({
  residentId: yup.number().min(1).required("This field is required"),
  requestType: yup.string().required("This field is required"),
  purpose: yup.string().required("This field is required"),
  status: yup.string().required("This field is required"),
});
