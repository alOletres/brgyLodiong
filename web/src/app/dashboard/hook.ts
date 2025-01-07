/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChartDataset } from "chart.js";
import { useState } from "react";

export const useHooks = () => {
  const [labels, setLabels] = useState<string[]>(["Online", "Walk in"]);
  const [dataSets, setDataSets] = useState<ChartDataset[]>([{ data: [1, 3] }]);

  return { labels, dataSets };
};
