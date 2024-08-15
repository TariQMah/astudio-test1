// src/components/DataTable.js
import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const DataTable = ({ columns }) => {
  const { data, filteredData } = useContext(DataContext);

  const records = filteredData?.length > 0 ? filteredData : data;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr className="font-neutra-bold">
            {columns?.map((item, index) => (
              <th className="py-3 px-6 text-left">{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {records.map((item, index) => {
            return (
              <tr
                key={item.id}
                className="border-b border-gray-200 font-neutra-book-alt hover:bg-gray-100"
              >
                {columns.map((itm, ind) => {
                  return (
                    <td className="py-3 px-6 text-left uppercase">
                      {records[index][itm.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
