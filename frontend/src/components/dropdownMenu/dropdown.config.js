import {
  LayoutDashboard,
  ClipboardPlus,
  CalendarDays,
  CalendarCheck,
  UserRoundPen,
  Hospital,
  LogOut,
} from "lucide-react";

export const dropdownItems = [
  {
    id: 1,
    icons: LayoutDashboard,
    name: "Dashboard",
    path: "/dashboard",
    type: "link",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 2,
    icons: UserRoundPen,
    name: "Profile",
    path: "/profile",
    type: "link",
    roles: ["super_admin", "doctor", "receptionist"],
  },
  {
    id: 3,
    icons: LogOut,
    name: "Logout",
    path: "/logout",
    type: "action",
    action: "logout",
    roles: ["super_admin", "doctor", "receptionist"],
  },
];
