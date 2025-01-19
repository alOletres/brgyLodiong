"use client";
import { Box, SxProps, Theme } from "@mui/material";
import { useHooks } from "./hook";
import CustomChart from "@/components/Chart";
import LinearLoader from "@/components/LinearLoader";
const CardStyle: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  wordSpacing: 5,
  paddingBottom: 2,
};

const DashBoardPage = () => {
  const {
    dataSetProjects,
    labelProjects,
    dataSetResidents,
    labelResidents,

    labelRequestTypes,
    dataSetRequest,
    isFetchingRequest,
    isFetchingProjects,
    isFetchingResidents,
  } = useHooks();

  return (
    <>
      {(isFetchingRequest || isFetchingProjects || isFetchingResidents) && (
        <LinearLoader height={4} />
      )}
      <Box sx={CardStyle}>
        <Box sx={{ width: "25%" }}>
          <CustomChart
            title="Projects statistics"
            type="doughnut"
            datasets={dataSetProjects}
            labels={labelProjects}
          />
        </Box>
        <Box sx={{ width: "25%" }}>
          <CustomChart
            title="Population Statistics"
            type="polarArea"
            datasets={dataSetResidents}
            labels={labelResidents}
          />
        </Box>

        <Box sx={{ width: "35%" }}>
          <CustomChart
            title="Requests Statistics"
            type="bar"
            datasets={dataSetRequest}
            labels={labelRequestTypes}
          />
        </Box>
      </Box>
    </>
  );
};

export default DashBoardPage;
