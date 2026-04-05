import React from "react";
import { Plus } from "lucide-react";

const SearchField = ({ handleAdd, search, handleSearch }) => {
  return (
    <>
      {/* Add + Search */}
      <div className="flex justify-between mb-5">
        <input
          type="text"
          placeholder="Search..."
          className="sm:w-1/2 md:w-1/4  border border-gray-300 rounded p-1 px-3 focus:ring focus:border-primary"
          value={search}
          onChange={handleSearch}
        />

        <button
          onClick={handleAdd}
          className="w-10 h-10 flex justify-center items-center bg-primary rounded p-2 cursor-pointer text-white hover:bg-primaryHover transition duration-200"
        >
          <Plus size={20} /> 
        </button>
      </div>
    </>
  );
};

export default SearchField;
