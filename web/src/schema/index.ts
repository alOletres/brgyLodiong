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
