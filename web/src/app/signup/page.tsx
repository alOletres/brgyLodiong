"use client";
import { Box, styled, Typography } from "@mui/material";
import { useHooks } from "./hook";
import CustomStepper from "@/components/Stepper";

const Logo = styled("img")({
  width: "80px",
  height: "80px",
  marginBottom: "10px",
});

const SignUpPage = () => {
  const { stepperProps } = useHooks();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        gap: 2,
      }}
    >
      {/* Styled Box with Gray Border */}
      <Box
        sx={{
          borderColor: "gray", // Updated to gray
          borderRadius: 2, // Rounded edges
          px: 6, // Horizontal padding
          py: 4, // Vertical padding
          boxShadow: 1, // Adds subtle depth
          backgroundColor: "white", // Keeps content readable
        }}
      >
        {/* Title with Centered Logo and Text */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center", // Centers text and logo
            justifyContent: "center", // Centers items horizontally
            width: "100%",
            mb: 2, // Adds spacing below
          }}
        >
          <Logo src="/logo.png" alt="Barangay Logo" />
          <Typography
            variant="h5"
            sx={{
              color: "green",
              textTransform: "uppercase",
              fontWeight: "bold",
              ml: 2, // Adds spacing between logo and text
              display: "flex",
              alignItems: "center", // Ensures text aligns properly
            }}
          >
            Register Resident Here
          </Typography>
        </Box>

        {/* Stepper Component */}
        <CustomStepper {...stepperProps} />
      </Box>
    </Box>
  );
};

export default SignUpPage;
