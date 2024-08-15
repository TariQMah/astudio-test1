import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const ProductFilters = () => {
  const [category, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const { setFilters, onFilter, data } = useContext(DataContext);

  const getFilters = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(response?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    const products = data;
    const totalBrands = [...new Set(products.map((product) => product.brand))];
    setBrands(totalBrands);
  }, [data]);

  return (
    <div className="flex gap-3 justify-start items-center">
      <select
        onChange={(e) => onFilter("category", e.target.value)}
        className=" rounded-sm border h-10 mx-4"
      >
        <option value="">Select a category</option>
        {category.map((cat, index) => (
          <option key={index} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilter("brand", e.target.value)}
        className=" rounded-sm border h-10 mx-4"
      >
        <option value="">Select a category</option>
        {brands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilters;
