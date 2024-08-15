import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";

const UserFilters = () => {
  const { setFilters, filters, onFilter, data } = useContext(DataContext);
  const [users, setUsers] = useState([]);
  const [eyeColor, setEyeColor] = useState([]);

  const [bloodGroup, setBloodGroup] = useState([]);

  const getFilters = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      const data = response?.data?.users;
      const bloodGroup = [...new Set(data.map((user) => user.bloodGroup))];
      const users = [...new Set(data.map((user) => user.firstName))];
      const eyeColor = [...new Set(data.map((user) => user.eyeColor))];
      setBloodGroup(bloodGroup);
      setUsers(users);
      setEyeColor(eyeColor);
    } catch (error) {}
  };

  useEffect(() => {
    getFilters();
  }, []);
  console.log("filters: ", filters);

  return (
    <div className="flex gap-3 justify-start items-center">
      <select
        onChange={(e) => onFilter("firstName", e.target.value)}
        className=" rounded-sm border h-10 mx-4"
      >
        <option value="">Select a category</option>
        {users.map((cat, index) => (
          <option key={index} selected={filters?.firstName === cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilter("bloodGroup", e.target.value)}
        className=" rounded-sm border h-10 mx-4"
      >
        <option value="">Select a category</option>
        {bloodGroup.map((cat, index) => (
          <option
            key={index}
            selected={filters?.bloodGroup === cat}
            value={cat}
          >
            {cat}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilter("eyeColor", e.target.value)}
        className=" rounded-sm border h-10 mx-4"
      >
        <option value="">Select a category</option>
        {eyeColor.map((cat, index) => (
          <option key={index} selected={filters?.eyeColor === cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilters;
