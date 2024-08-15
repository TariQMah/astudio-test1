import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";

const Users = () => {
  const { fetchData, pageSize, searchTerm } = useContext(DataContext);
  console.log("searchTerm: ", searchTerm);

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

  const filterd = columns?.map((item) => item.key).toString();

  useEffect(() => {
    fetchData(filterd, pageSize, searchTerm);
  }, [pageSize]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <Filters />
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
};

export default Users;
