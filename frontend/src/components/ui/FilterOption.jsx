import React from "react";

const FilterOption = ({ status, onChange, options, className }) => {


  return (
    <div className="py-3 w-full sm:w-auto">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={`border px-3 py-2 rounded bg-white ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="overflow-x-hid">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOption;
