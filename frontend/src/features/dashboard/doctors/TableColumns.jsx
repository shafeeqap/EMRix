import { Trash2, PenLine } from "lucide-react";
import { formatWorkingHours } from "../../../utils/formatWorkingHours";

export const Columns = [
  {
    header: "SL",
    render: (_, index) => index + 1,
  },
  {
    header: "First Name",
    accessor: "firstName",
  },
  {
    header: "Last Name",
    accessor: "lastName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Department",
    accessor: "department",
  },
  {
    header: "Working Hours",
    render: (row) => formatWorkingHours(row.workingHours),
  },
  {
    header: "Slot Duration",
    accessor: "slotDuration",
  },
  {
    header: "Status",
    render: (row) => (
      <span
        className={`px-2 py-1 text-xs font-medium cursor-pointer text-white ${
          row.isActive ? "bg-green-700" : "bg-red-700"
        }`}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    header: "Actions",
    render: (row) => (
      <div className="flex gap-5 ">
        <PenLine  className="cursor-pointer" />

        <Trash2  className="text-red-700 cursor-pointer" />
      </div>
    ),
  },
];
