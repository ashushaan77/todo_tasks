import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (username && password && password.length > 5) {
      try {
        const data = await fetch("/user/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
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
      setError("Please fill the form correctly.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="w-80 min-h-fit rounded shadow p-4 bg-white">
        <div className="mb-4">
          <p className="font-semibold">Sign Up</p>
          <p className="font-regular text-xs">Create Your Account!</p>
        </div>
        <div>{error}</div>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={signupHandler}
        >
          <div className="my-1 border rounded p-2 w-full">
            <input
              className="outline-0 w-full"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
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
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="my-1">
            <input
              className="px-4 py-1 cursor-pointer bg-sky-700 rounded text-white"
              type="submit"
              value={"Create"}
            />
          </div>
          <p>OR</p>

          <div className="my-1">
            <NavLink
              className="px-4 py-2 cursor-pointer text-sky-700 rounded "
              to={"/login"}
            >
              Go back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
