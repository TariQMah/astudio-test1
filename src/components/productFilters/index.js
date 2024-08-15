import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { camelToTitle } from "../../utils";

const ProductFilters = () => {
  const { onFilter, filters, data } = useContext(DataContext);
  console.log("filters: ", filters);
  const [filterState, setFilterState] = useState({});

  const fetchData = (url) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
        return [];
      });
  };

  const initializeFilters = (filters) => {
    let url = "https://dummyjson.com/products";
    if (filters?.category === "Laptops")
      url = `https://dummyjson.com/products/category/${filters?.category}`;
    console.log("url: ", url);
    Promise.all([fetchData(url)])
      .then(([productsData]) => {
        const products = productsData?.products;

        setFilterState({
          brand: [
            ...new Set(
              products
                .map((product) => product.brand)
                .filter((brand) => brand !== undefined)
            ),
          ],
          category: ["All", "Laptops"],
          title: [
            ...new Set(
              products
                .map((product) => product.title)
                .filter((brand) => brand !== undefined)
            ),
          ],
        });
      })
      .catch((error) => {
        console.error("Error initializing filters:", error);
      });
  };

  useEffect(() => {
    initializeFilters(filters);
  }, [filters]);

  return (
    <div className="flex gap-3 font-neutra-book-alt justify-start items-center">
      {Object.keys(filterState).map((filterKey, index) => (
        <select
          key={index}
          onChange={(e) => onFilter(filterKey, e.target.value)}
          className="w-4/12 rounded-sm border h-10 mx-4"
        >
          <option value="">Select {camelToTitle(filterKey)}</option>

          {filterState[filterKey]?.map((option, idx) => (
            <option
              key={idx}
              value={option}
              selected={filters[filterKey] === option}
            >
              {option}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default ProductFilters;
