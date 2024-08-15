import React from "react";
import { DataProvider } from "./contexts/DataContext";
import Users from "./pages/Users";
import Products from "./pages/Products";
import { Link, useRoutes } from "react-router-dom";
import Layout from "./pages/Layout";

function App() {
  const routes = [
    { path: "/products", element: <Products /> },
    { path: "/users", element: <Users /> },
    { path: "/", element: <Users /> },
  ];

  const element = useRoutes(routes);
  return (
    <DataProvider>
      <Layout>{element}</Layout>
    </DataProvider>
  );
}

export default App;
