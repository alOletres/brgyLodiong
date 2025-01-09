import React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const CustomLinearLoader = ({
  color = "primary",
  height = 4,
}: Pick<LinearProgressProps, "color"> & { height: number }) => {
  const dimOpacity = 0.5;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh", // Cover entire viewport
        zIndex: 9999,
        backgroundColor: `rgba(0, 0, 0, ${dimOpacity})`, // Dim background
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Keep loader at the top
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: `${height}px`,
        }}
      >
        <LinearProgress color={color} />
      </Box>
    </Box>
  );
};

export default CustomLinearLoader;
