import { Trash2, PenLine } from "lucide-react";
import { formatWorkingHours } from "../../../utils/formatWorkingHours";
import { getDuration } from "../../../utils/calculateDuration";

export const getColumns = ({ onEdit, onDelete, onUpdateStatus }) => [
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
    render: (row) => {
      const duration = getDuration(row.workingHours);

      let color = "text-gray-700";

      if (duration <= 240) color = "text-green-600"; // <= 4h
      else if (duration <= 480) color = "text-blue-600"; // <= 8h
      else color = "text-red-600"; // long shift

      return (
        <span className={`${color} font-medium`}>
          {formatWorkingHours(row.workingHours)}
        </span>
      );
    },
  },
  {
    header: "Break Time",
    render: (row) => {
      return row.breakTimes?.length ? (
        <span className="text-gray-500">
          {formatWorkingHours(row.breakTimes[0])}
        </span>
      ) : (
        <span className="text-red-600">No break time</span>
      );
    },
  },
  {
    header: "Slot Duration",
    accessor: "slotDuration",
  },
  {
    header: "Status",
    render: (row) => (
      <span onClick={() => onUpdateStatus(row)}
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
        <PenLine onClick={() => onEdit(row)} className="cursor-pointer" />

        <Trash2
          onClick={() => onDelete(row)}
          className="text-red-700 cursor-pointer"
        />
      </div>
    ),
  },
];
