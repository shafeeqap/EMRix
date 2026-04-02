import React from "react";
import { dropdownItems } from "./dropdown.config";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  return (
    <div className="bg-white min-w-28 border shadow px-2 py-2 z-50">
      <ul>
        {dropdownItems.map((item) => {
          const Icon = item.icons;
          
          return (
            <li key={item.id} className="p-2 hover:bg-slate-100 cursor-pointer">
              <div className="flex gap-2">
                <Icon size={20} />
                <Link to={item.path} className="text-sm">
                  {item.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownMenu;
