"use client";
import React from "react";
import { styled } from "@mui/system";
import { LockOpenOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { Box, Button, SxProps } from "@mui/material";
import { LoginSchema } from "@/schema";
import { CustomInput } from "@/components/TextFieldInput";
import { useHooks } from "./hook";
import { Theme } from "@emotion/react";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to right bottom, #430089, #82ffa1)",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#ffff",
  padding: "10px",
});

const LoginContainer = styled("div")({
  textAlign: "center",
  textTransform: "uppercase",
  padding: "20px",
});

const buttonStyle: SxProps<Theme> = {
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  fontSize: 12,
  color: "blue",
  padding: 1,
  ":hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const LoginPage = () => {
  const { handleSubmit, initialValues } = useHooks();

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <FormContainer>
              <LoginContainer>
                <LockOpenOutlined />
                <h2>Login</h2>
              </LoginContainer>
              <CustomInput
                label="Username"
                name="username"
                id="username"
                type="text"
              />
              <CustomInput
                label="Password"
                name="password"
                id="password"
                type="password"
              />

              <Box sx={{ paddingTop: "6px", width: "100%" }}>
                <Button
                  disabled={isSubmitting}
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={submitForm}
                >
                  Sign In
                </Button>

                <Box sx={buttonStyle}>
                  <span>Click here to register</span>
                </Box>
              </Box>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
