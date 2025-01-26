import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import InsertItem from "./InsertItem";
import { useNavigate } from "react-router";
import Header from "../common_component/header";

export default function Todo(props) {
  const [error, setError] = useState("");
  const [list, setlist] = useState([]);

  let navigate = useNavigate();

  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    async function getList() {
      try {
        const data = await fetch("/todo/list/" + username)
          .then((data) => data.json())
          .catch((err) => console.log(err));

        if (data && !data.error) {
          setlist(data.list);
        } else if (data) {
          setError(data.error || "");
        }
      } catch (e) {
        setError(e.message);
      }
    }
    if (username === "") {
      navigate("/login", { replace: true });
    } else {
      getList();
    }
  }, [username, navigate]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-8">
        <div style={{ width: "100%" }}>
          <div>{error}</div>
          <ToDoList setlist={setlist} list={list} setError={setError} />
          <hr />
          <InsertItem setlist={setlist} list={list} setError={setError} />
        </div>
      </div>
    </>
  );
}
