"use client";
import React from "react";
import { styled } from "@mui/system";
// import { LockOpenOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/material";
import { LoginSchema, SignUpResidentSchema } from "@/schema";
import { CustomInput } from "@/components/TextFieldInput";
import { useHooks } from "./hook";
import Modal from "@/components/Modal";
import LinearLoader from "@/components/LinearLoader";

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to right bottom, #2e8b57, #6ec1e4)",
});

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  width: "350px",
});

const Header = styled("div")({
  textAlign: "center",
  marginBottom: "20px",
});

const Logo = styled("img")({
  width: "120px",
  height: "120px",
  marginBottom: "10px",
});

const Title = styled("h1")({
  fontSize: "20px",
  color: "#2e8b57",
  margin: 0,
  fontWeight: "bold",
});

const Subtitle = styled("p")({
  fontSize: "14px",
  color: "#555555",
});

const LoginPage = () => {
  const {
    loader,
    handleSubmit,
    initialValues,
    handleToggleModal,
    open,
    handleSignUp,
    fields,
    residentInitialValues,
  } = useHooks();

  return (
    <>
      {loader && <LinearLoader height={4} />}
      <Modal
        title="Sign Up"
        formProps={{
          initialValues: residentInitialValues,
          validationSchema: SignUpResidentSchema,
          fields,
          handleSubmit: handleSignUp,
        }}
        handleClose={handleToggleModal}
        open={open}
        width={500}
        btnName="Sign Up"
      />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <FormContainer>
                <Header>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Logo src="/logo.png" alt="Barangay Logo" />
                    <Logo src="/brgy.jpg" alt="Barangay Logo" />
                  </Box>
                  <Title>Barangay Lower Lodiong</Title>
                  <Subtitle>Tambulig, Zamboanga del Sur</Subtitle>
                </Header>
                <CustomInput
                  label="Email"
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

                <Box sx={{ paddingTop: "10px", width: "100%" }}>
                  <Button
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      backgroundColor: "#2e8b57",
                      color: "#fff",
                    }}
                    variant="contained"
                    onClick={submitForm}
                  >
                    Sign In
                  </Button>

                  <Box
                    sx={{
                      flex: 1,
                      justifyContent: "center",
                      textAlign: "center",
                      fontSize: 12,
                      color: "#2e8b57",
                      padding: 1,
                      ":hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                    onClick={handleToggleModal}
                  >
                    <span>Click here to register</span>
                  </Box>
                </Box>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default LoginPage;
