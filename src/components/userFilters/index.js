import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { camelToTitle } from "../../utils/index";

const UserFilters = () => {
  const { filters, onFilter } = useContext(DataContext);
  const [filterState, setFilterState] = useState({});

  const findUnique = (key, data) => {
    return [...new Set(data.map((user) => user[key]))];
  };

  const getFilters = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      const data = response?.data?.users;
      setFilterState({
        bloodGroup: findUnique("bloodGroup", data),
        email: findUnique("email", data),
        firstName: findUnique("firstName", data),
        eyeColor: findUnique("eyeColor", data),
      });
    } catch (error) {}
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <div className="flex gap-3 font-neutra-book-alt justify-start items-center">
      {Object.keys(filterState).map((item, i) => {
        return (
          <select
            key={i}
            onChange={(e) => onFilter(item, e.target.value)}
            className="font-neutra-book-alt w-4/12 rounded-sm border h-10 mx-4"
          >
            <option value="">Select an {camelToTitle(item)}</option>
            {filterState[item].map((name, index) => {
              return (
                <option
                  key={index}
                  selected={filters[item] === name}
                  value={name}
                >
                  {name}
                </option>
              );
            })}
          </select>
        );
      })}
    </div>
  );
};

export default UserFilters;
