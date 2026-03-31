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
