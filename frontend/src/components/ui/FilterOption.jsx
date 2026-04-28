import React from "react";

const FilterOption = ({ status, onChange, options }) => {


  return (
    <div className="py-3">
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-2 rounded w-52 bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterOption;
