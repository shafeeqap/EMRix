import React from "react";
import { Search } from "lucide-react";

const SearchField = ({ handleAdd, search, handleSearch }) => {
  return (
    <>
      {/* Add + Search */}
      <div className="flex justify-between mb-5">
        <button
          onClick={handleAdd}
          className="w-10 h-10 flex justify-center items-center bg-blue-500 rounded p-2 cursor-pointer text-white hover:bg-blue-600"
        >
          <Search size={20} title="add product" />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-60 border rounded p-1"
          value={search}
          onChange={handleSearch}
        />
      </div>
    </>
  );
};

export default SearchField;
