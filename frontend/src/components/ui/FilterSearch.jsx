import React from "react";
import InputField from "./InputField";

const FilterSearch = ({ value, onChange }) => {
  return (
    <>
      <InputField
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
};

export default FilterSearch;
