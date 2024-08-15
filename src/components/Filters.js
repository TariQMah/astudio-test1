// src/components/Filters.js
import React, { useState, useContext, useEffect, useCallback } from "react";
import { DataContext } from "../contexts/DataContext";
import axios from "axios";
import { Cross, CrossIcon, Search, XIcon } from "lucide-react";

const Filters = ({ children }) => {
  const {
    setData,
    setLoading,
    setPageSize,
    searchData,
    setTotalPages,
    pageSize,
    searchTerm,
    setFilteredData,
    setSearchTerm,
    fetchData,
  } = useContext(DataContext);
  const [searchShow, setSearchShow] = useState(false);

  const toggleSearch = () => {
    setSearchTerm(null);
    setFilteredData([]);
    setSearchShow((prev) => !prev);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="flex gap-5 items-center min-h-10 border-r-2 px-4 ">
        <select
          className="p-2 rounded-md font-neutra-book-alt"
          onChange={(e) => setPageSize(e.target.value)}
          value={pageSize}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="font-neutra-book-alt">Entries</span>
      </div>

      <div className="flex gap-5 items-center min-h-10 border-r-2 px-4 ">
        {!searchShow ? (
          <Search
            size={20}
            color="gray"
            onClick={toggleSearch}
            className="cursor-pointer font-neutra-book-alt"
          />
        ) : (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border font-neutra-book-alt border-gray-300 p-2 rounded-md"
              onChange={(e) => searchData(e.target.value)}
              value={searchTerm}
            />
            <XIcon
              className="absolute cursor-pointer right-2 top-2"
              onClick={toggleSearch}
              color="gray"
            />
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default Filters;
