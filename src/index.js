import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UsersProvider from "./store/UsersContext";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserProfile from "./components/UserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersList />}></Route>
        <Route path="/user/:id" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  </UsersProvider>
);
