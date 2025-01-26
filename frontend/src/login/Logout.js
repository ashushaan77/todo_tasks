import React from "react";
import { Navigate } from "react-router";

export default function Logout() {
  localStorage.clear();

  return <Navigate to={"/login"} replace="true" />;
}
