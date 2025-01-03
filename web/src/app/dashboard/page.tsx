"use client";
import { Box, SxProps, Theme } from "@mui/material";
import { useHooks } from "./hook";
import CustomChart from "@/components/Chart";
const CardStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  wordSpacing: 5,
  paddingBottom: 2,
};

const DashBoardPage = () => {
  const { labels, dataSets } = useHooks();

  return (
    <Box sx={CardStyle}>
      <Box sx={{ width: "30%" }}>
        <CustomChart
          title="Statistics"
          type="doughnut"
          datasets={dataSets}
          labels={labels}
        />
      </Box>
      <Box sx={{ width: "30%" }}>
        <CustomChart
          title="Statistics"
          type="bar"
          datasets={dataSets}
          labels={labels}
        />
      </Box>

      <Box sx={{ width: "30%" }}>
        <CustomChart
          title="Statistics"
          type="line"
          datasets={dataSets}
          labels={labels}
        />
      </Box>
    </Box>
  );
};

export default DashBoardPage;
