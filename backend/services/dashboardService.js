import { getDashboard } from "../repositories/dashboardRepository.js";

export const getDashboardDataService = async () => {
  const data = await getDashboard();

  return data;
};
