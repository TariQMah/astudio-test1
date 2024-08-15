import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { loading, setFilters } = useContext(DataContext);
  const navigate = useNavigate();

  const onRouteChange = (to) => {
    setFilters({});
    navigate(to);
  };

  return (
    <div>
      <h1>Task1: (React)</h1>
      <div className="flex justify-end px-3 gap-5">
        <button
          onClick={() => onRouteChange("users")}
          className="bg-black text-white rounded-sm p-2"
        >
          Users
        </button>
        <button
          onClick={() => onRouteChange("products")}
          className="bg-black text-white rounded-sm p-2"
        >
          Products
        </button>
      </div>
      {children}
      {loading && <Loading />}
    </div>
  );
};

export default Layout;
