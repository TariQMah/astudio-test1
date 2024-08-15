// src/pages/Products.js
import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import axios from "axios";
import ProductFilters from "../components/productFilters";

const Products = () => {
  const { pageSize, filters, searchTerm, fetchData } = useContext(DataContext);

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
    let categoryFilter = null;
    if (filters.category) {
      categoryFilter = `category/${filters.category}`;
    }
    if (filters.brand) {
      categoryFilter = `search?q=${filters.brand}`;
    }
    fetchData(filterd, pageSize, searchTerm, categoryFilter);
  }, [pageSize, filters]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Filters>
        <ProductFilters />
      </Filters>
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
};

export default Products;
