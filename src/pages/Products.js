// src/pages/Products.js
import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import axios from "axios";
import ProductFilters from "../components/productFilters";
import Loading from "../components/Loading";

const Products = () => {
  const { pageSize, filters, searchTerm, fetchData, loading } =
    useContext(DataContext);

  const columns = useMemo(
    () => [
      { label: "Title", key: "title" },
      { label: "Brand", key: "brand" },
      { label: "Category", key: "category" },
      { label: "Price", key: "price" },
      { label: "Rating", key: "rating" },
      { label: "SKU", key: "sku" },
      { label: "Stock", key: "stock" },
      { label: "Warranty", key: "warrantyInformation" },
      { label: "Availability", key: "availabilityStatus" },
    ],
    []
  );
  const filterd = useMemo(
    () => columns?.map((item) => item.key)?.toString(),
    []
  );
  useEffect(() => {
    const buildFilterQuery = (filters) => {
      const keys = Object.keys(filters);
      let filterQuery = "";

      const buildQuery = (index) => {
        if (index >= keys.length) return;

        const key = keys[index];
        const value = filters[key];

        if (value && value !== "All") {
          if (key === "category") {
            filterQuery += `category/${value}`;
          } else {
            filterQuery += `${filterQuery ? "&" : ""}search?q=${value}`;
          }
        }
        buildQuery(index + 1);
      };

      buildQuery(0);
      return filterQuery;
    };

    const categoryFilter = buildFilterQuery(filters);

    fetchData(filterd, pageSize, searchTerm, categoryFilter);
  }, [pageSize, filters]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 font-neutra-bold">Products</h1>
      <Filters>
        <ProductFilters />
      </Filters>
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
};

export default Products;
