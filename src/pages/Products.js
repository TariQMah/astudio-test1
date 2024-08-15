// src/pages/Products.js
import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../contexts/DataContext";
import Filters from "../components/Filters";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import axios from "axios";

const Products = () => {
  const { setData, setLoading, pageSize, pageRoute } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`https://dummyjson.com/${pageRoute}`, {
        params: { limit: pageSize },
      });
      setData(response.data.products);
      setLoading(false);
    };
    fetchData();
  }, [setData, setLoading]);

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

  const filters = [
    { label: "Title", key: "title" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Tabs", key: "" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Filters />
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
};

export default Products;
