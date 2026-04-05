import React from "react";
import { dropdownItems } from "./dropdown.config";
import { Link } from "react-router-dom";
import useLogoutHandler from "../../hooks/useLogoutHandler";
import { toast } from "react-toastify";
import { handleApiError } from "../../utils/handleApiError";

const DropdownMenu = () => {
  const { handleLogout } = useLogoutHandler();

  const onLogout = async () => {
    const result = await handleLogout();
    if (result.success) {
      toast.success(result.data.message || "Logged out successfully");
    } else {
      handleApiError(result.error, "Logout failed");
    }
  };

  return (
    <div className="bg-white min-w-28 border shadow px-2 py-2 z-50">
      <ul>
        {dropdownItems.map((item) => {
          const Icon = item.icons;

          return (
            <li key={item.id} className="p-2 hover:bg-slate-100 cursor-pointer">
              <div className="flex gap-2">
                <Icon size={20} />
                {item.type === "link" ? (
                  <Link to={item.path} className="text-sm">
                    {item.name}
                  </Link>
                ) : (
                  item.type === "action" && (
                    <span onClick={onLogout} className="text-sm">
                      {item.name}
                    </span>
                  )
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownMenu;
