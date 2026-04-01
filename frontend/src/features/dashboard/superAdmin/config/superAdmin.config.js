import { Stethoscope, CalendarCheck, Activity } from "lucide-react";

export const statusCardItems = [
  {
    id: 1,
    title: "Total Patients",
    key: "patients",
    icon: Activity,
    total: 500,
  },
  {
    id: 2,
    title: "Total Doctors",
    key: "doctors",
    icon: Stethoscope,
    total: 50,
  },
  {
    id: 3,
    title: "Total Appointments",
    key: "appointments",
    icon: CalendarCheck,
    total: 450,
  },
];

export const superAdminDashboard = [
  {
    id: "appointments",
    type: "chart",
    title: "Appointment Trends",
    chartType: "bar",
    dataKey: "appointments",
    config: {
      xKey: "name",
      bars: [
        { dataKey: "pv", color: "#8884d8" },
        { dataKey: "uv", color: "#82ca9d" },
      ],
    },
  },
  {
    id: "revenue",
    type: "chart",
    title: "Revenue Overview",
    chartType: "pie",
    dataKey: "revenue",
    config: {
      xKey: "month",
      lines: [{ dataKey: "value", color: "#4CAF50" }],
    },
  },
  {
    id: "totalPatients",
    type: "stat",
    title: "Total Patients",
    chartType: "line",
    dataKey: "patients",
  },
];
