/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ECERTIFICATES } from "@/constants/certificates.enum";
import { ProjectStatus } from "@/store/api/gen/officials";
import { RequestStatus } from "@/store/api/gen/request";
import { ResidentStatus } from "@/store/api/gen/residents";
import { useProjectsApi } from "@/store/api/hooks/projects";
import { useRequestApi } from "@/store/api/hooks/request";
import { useResidentsApi } from "@/store/api/hooks/residents";
import { ChartDataset } from "chart.js";
import { useEffect, useMemo, useState } from "react";

export const useHooks = () => {
  // Projects chart
  const [labelProjects] = useState<ProjectStatus[]>(["PENDING", "SUCCEED"]);
  const [dataSetProjects, setDataSetProjects] = useState<ChartDataset[]>([]);
  const { projects, isFetchingProjects } = useProjectsApi();

  // Resident Chart
  const [labelResidents] = useState<ResidentStatus[]>([
    "PENDING",
    "REGISTERED",
    "DISAPPROVED",
  ]);
  const [dataSetResidents, setDatasetResidents] = useState<ChartDataset[]>([]);
  const { residents, isFetchingResidents } = useResidentsApi();

  // Request Chart
  const [labelRequestTypes] = useState<ECERTIFICATES[]>(
    Object.values(ECERTIFICATES)
  );
  const [dataSetRequest, setDataSetRequest] = useState<ChartDataset[]>([]);
  const { requests, isFetchingRequest } = useRequestApi();

  const [requestStatus] = useState<RequestStatus[]>([
    "REJECTED",
    "APPROVED",
    "PENDING",
    "CLAIMED",
    "UNCLAIMED",
  ]);
  const [dataSetRequestStatus, setDataSetRequestStatus] = useState<
    ChartDataset[]
  >([]);

  // Projects hooks
  const projectsCountByStatus = useMemo(() => {
    if (!projects?.length) return [];
    return labelProjects.map(
      (status) => projects.filter((project) => project.status === status).length
    );
  }, [projects]);

  useEffect(() => {
    setDataSetProjects([
      { data: projectsCountByStatus, label: "Datasets Project" },
    ]);
  }, [projectsCountByStatus]);

  // Resident hooks
  const residentsCountByStatus = useMemo(() => {
    if (!residents?.length) return [];

    return labelResidents.map(
      (status) =>
        residents.filter(
          (resident) => resident.status === status && resident.role !== "ADMIN"
        ).length
    );
  }, [residents]);

  useEffect(() => {
    setDatasetResidents([
      { data: residentsCountByStatus, label: "Datasets Resident" },
    ]);
  }, [residentsCountByStatus]);

  // Request types hooks
  const requestCountByTypes = useMemo(() => {
    if (!requests?.length) return [];

    return labelRequestTypes.map(
      (types) =>
        requests.filter(
          (request) =>
            request.requestType === types && request.status === "CLAIMED"
        ).length
    );
  }, [requests]);

  useEffect(() => {
    setDataSetRequest([
      { data: requestCountByTypes, label: "Dataset Request Claimed" },
    ]);
  }, [requestCountByTypes]);

  // Request types hooks
  const requestStatusCount = useMemo(() => {
    if (!requests?.length) return [];

    return requestStatus.map(
      (status) => requests.filter((request) => request.status === status).length
    );
  }, [requests]);

  useEffect(() => {
    setDataSetRequestStatus([
      { data: requestStatusCount, label: "Dataset Request Status" },
    ]);
  }, [requestStatusCount]);

  return {
    dataSetProjects,
    isFetchingProjects,
    labelProjects,

    isFetchingResidents,
    labelResidents,
    dataSetResidents,

    labelRequestTypes,
    dataSetRequest,
    isFetchingRequest,

    requestStatus,
    dataSetRequestStatus,
  };
};
