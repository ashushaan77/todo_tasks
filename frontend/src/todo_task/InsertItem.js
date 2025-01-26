import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function InsertItem(props) {
  const { setlist, list, setError } = props;
  const navigate = useNavigate();
  const [task, setTask] = useState("");

  const username = localStorage.getItem("username") || "";

  const addNewItem = async (e) => {
    e.preventDefault();

    if (task !== "" && username !== "") {
      const data = await fetch("/todo/add", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          task: task,
        }),
      })
        .then((data) => data.json())
        .catch((err) => console.log(err));

      if (data && !data.error) {
        const new_list = [...list, data.task];
        setTask("");
        setlist(new_list);
      } else if (data) {
        setError(data.error || "");
      }
    } else if (username === "") {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="py-2">
      <p className="font-medium text-sm pb-1">Create Task</p>
      <form className="flex flex-raw gap-2 items-center">
        <div className="border px-4 py-2 shadow-inner rounded w-full">
          <input
            autoFocus
            className="outline-0 block w-full"
            type="text"
            placeholder="Write Your Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div>
          <button
            className="text-white min-w-max px-4 py-2 bg-sky-700 hover:bg-sky-800 rounded"
            onClick={addNewItem}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
