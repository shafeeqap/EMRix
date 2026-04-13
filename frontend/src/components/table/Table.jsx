import React from "react";

const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto mt-6 bg-base-100 shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-xs uppercase tracking-wider text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition duration-150"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
