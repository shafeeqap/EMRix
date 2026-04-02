import {
  LayoutDashboard,
  ClipboardPlus,
  CalendarDays,
  CalendarCheck,
  UserRoundPen,
  Hospital,
  LogOut
} from "lucide-react";

export const dropdownItems = [
  {
    id: 1,
    icons: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 2,
    icons: UserRoundPen,
    name: "Profile",
    path: "/profile",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 3,
    icons: LogOut,
    name: "Logout",
    path: "/logout",
    roles: ["super_admin", "doctor", "receptionist"],
  },
];
