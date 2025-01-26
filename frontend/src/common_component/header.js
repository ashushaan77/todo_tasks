import React from "react";
import { NavLink } from "react-router";

export default function Header() {
  const name = localStorage.getItem("name") || "";

  return (
    <div className="w-full flex justify-between shadow bg-white ">
      <div className="px-1">
        <NavLink to={"/"}>
          <p className="font-bold text-blue-500 p-2 py-4">Todo Tasks</p>
        </NavLink>
      </div>
      <div className="flex justify-between">
        <p className="font-regular text-black-300 p-2 py-4">
          Hi, {name} {"|"}
        </p>

        <NavLink to={"/logout"}>
          <p className="font-regular text-black-500 p-2 py-4">Logout</p>
        </NavLink>
      </div>
    </div>
  );
}
