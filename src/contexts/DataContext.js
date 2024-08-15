import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState([]);
  const location = useLocation();

  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({});

  const onFilter = useCallback(
    (name, value) => {
      setFilters({
        [name]: value,
      });
    },
    [filters]
  );

  const pageRoute = location.pathname === "/products" ? "products" : "users";
  const fetchData = useCallback(
    async (filterd, pageSize, searchTerm, query = null) => {
      setLoading(true);
      try {
        let url = `https://dummyjson.com/${pageRoute}`;
        if (query) url = `https://dummyjson.com/${pageRoute}/${query}`;
        const response = await axios.get(url, {
          params: {
            limit: pageSize,
            select: filterd,
            searchTerm,
          },
        });
        setData(response?.data[pageRoute]);
        setTotalPages(Math.ceil(response.data.total / pageSize));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [pageRoute, data]
  );

  const searchData = useCallback(
    (term) => {
      setSearchTerm(term);
      if (!term.trim()) {
        setFilteredData(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        const filtered = data.filter((item) =>
          Object.values(item).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(term.toLowerCase())
          )
        );
        setFilteredData(filtered);
        setTotalPages(Math.ceil(filtered.length / pageSize));
      }
      setCurrentPage(1);
    },
    [data, pageSize]
  );

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        setTotalPages,
        totalPages,
        setPageSize,
        pageSize,
        currentPage,
        setCurrentPage,
        filteredData,
        searchData,
        setSearchTerm,
        setFilteredData,
        columns,
        setColumns,
        pageRoute,
        fetchData,
        searchTerm,
        onFilter,
        filters,
        setFilters,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
