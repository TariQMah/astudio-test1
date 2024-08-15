import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import UserFilters from "../components/userFilters";

const Users = () => {
  const { fetchData, pageSize, searchTerm, filters } = useContext(DataContext);

  const columns = useMemo(
    () => [
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Maiden Name", key: "maidenName" },
      { label: "Age", key: "age" },
      { label: "Gender", key: "gender" },
      { label: "Email", key: "email" },
      { label: "Username", key: "username" },
      { label: "Blood Group", key: "bloodGroup" },
      { label: "Eye Color", key: "eyeColor" },
    ],
    []
  );

  const filterd = useMemo(
    () => columns?.map((item) => item.key).toString(),
    [columns]
  );
  useEffect(() => {
    let categoryFilter = null;
    if (filters && Object.keys(filters).length > 0) {
      const filterArray = Object.keys(filters)
        .filter((key) => filters[key].trim() !== "")
        .map((key) => {
          return `key=${key}&value=${encodeURIComponent(filters[key])}`;
        });

      if (filterArray.length > 0) {
        categoryFilter = `filter?${filterArray.join("&")}`;
      }
    }
    fetchData(filterd, pageSize, searchTerm, categoryFilter);
  }, [pageSize, filters]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Filters>
        <UserFilters />
      </Filters>
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
};

export default Users;
