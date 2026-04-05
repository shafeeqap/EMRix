import {
  LayoutDashboard,
  ClipboardPlus,
  CalendarDays,
  CalendarCheck,
  Hospital,
} from "lucide-react";

export const sidebarItems = [
  {
    id: 1,
    icons: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 2,
    icons: ClipboardPlus,
    name: "Doctors",
    path: "/doctors",
    roles: ["super_admin"],
  },
  {
    id: 3,
    icons: Hospital,
    name: "Patients",
    path: "/patient",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 4,
    icons: CalendarDays,
    name: "Doctor Schedules",
    path: "shedules",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 5,
    icons: CalendarCheck,
    name: "Patient Appointments",
    path: "/appointments",
    roles: ["super_admin", "doctor", "receptionist"],
  },
];
