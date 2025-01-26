import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (username && password && password.length > 5) {
      try {
        const data = await fetch("/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }).then((response) => response.json());
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("username", username);
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("name", data.user.name);
          navigate("/", { replace: true });
        }
      } catch (e) {
        setError("Error: " + e);
      }
    } else {
      setError("Please enter valid username & password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="w-80 min-h-fit rounded shadow p-4 bg-white">
        <div className="mb-4">
          <p className="font-semibold">Login</p>
          <p className="font-regular text-xs">Welcome Back!</p>
        </div>
        <div>{error}</div>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={loginHandler}
        >
          <div className="my-1 border rounded p-2 w-full">
            <input
              className="outline-0 w-full"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="my-1 border rounded p-2 w-full">
            <input
              className="outline-0 w-full"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="my-1">
            <input
              className="px-4 py-1 cursor-pointer bg-sky-700 rounded text-white"
              type="submit"
              value={"Login"}
            />
          </div>
          <p>OR</p>

          <div className="my-1">
            <NavLink
              className="px-4 py-2 cursor-pointer text-sky-700 rounded "
              to={"/user/create"}
            >
              Create New Account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
