import React from "react";
import { DataProvider } from "./contexts/DataContext";
import Users from "./pages/Users";
import Products from "./pages/Products";
import { Link, useRoutes } from "react-router-dom";

function App() {
  const routes = [
    { path: "/products", element: <Products /> },
    { path: "/users", element: <Users /> },
    { path: "/", element: <Users /> },
  ];

  const element = useRoutes(routes);
  return (
    <DataProvider>
      <div>
        <h1>Task1: (React)</h1>
        <div className="flex justify-end px-3 gap-5">
          <Link className="bg-black text-white rounded-sm p-2" to={"users"}>
            Users
          </Link>
          <Link className="bg-black text-white rounded-sm p-2" to={"products"}>
            Products
          </Link>
        </div>
        {element}
      </div>
    </DataProvider>
  );
}

export default App;
