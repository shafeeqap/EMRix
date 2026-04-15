import React from "react";

const FilterOption = ({ status, setStatus }) => {
  return (
    <div className="py-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded w-52 bg-gray-100"
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default FilterOption;
