import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

export default function ToDoList(props) {
  const { list, setlist, setError } = props;
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "";

  const handleDelete = async (index, id) => {
    let new_list = [...list];
    if (username !== "") {
      if (new_list[index]._id === id) {
        const data = await fetch("/todo/delete", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id, username: username }),
        })
          .then((data) => data.json())
          .catch((err) => setError(err));

        if (data && !data.error) {
          new_list.splice(index, 1);
          setlist(new_list);
        } else if (data) {
          setError(data.error || "");
        }
      }
    } else {
      navigate("/login", { replace: true });
    }
  };

  const statusHandler = async (index, id, new_status) => {
    const new_list = [...list];

    if (new_list[index]._id === id && new_list[index].status !== new_status) {
      const data = await fetch("/todo/update", {
        method: "post",
        body: JSON.stringify({
          id: id,
          status: new_status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      if (data && !data.error) {
        new_list[index].status = new_status;
      }
    }

    setlist(new_list);
  };

  return (
    <div className="block w-full pb-2">
      <h2 className="font-semibold">Tasks</h2>
      {list.length > 0 ? (
        <div className="flex font-semibold flex-row justify-between border rounded p-2 my-1">
          <div className="flex gap-3 justify-end items-center">
            <p className="text-xs ">S.N</p>
            <p className="text-xs">Task</p>
          </div>{" "}
          <div className="flex gap-3 justify-end items-center">
            <p className="text-xs">Status</p>
            <p className="text-xs">Action</p>
          </div>
        </div>
      ) : (
        <p className="text-center p-4 border rounded">No Task</p>
      )}
      {list.map((l, index) => (
        <div
          className="flex flex-row gap-2 justify-between border rounded p-2 my-1"
          key={index + l._id}
        >
          <div className="flex gap-3 justify-end items-center">
            <p className="text-sm">{index + 1}. </p>
            <p className="text-sm">{l.task}</p>
          </div>{" "}
          <div className="flex gap-3 justify-end items-center">
            <select
              value={l.status}
              onChange={(e) => statusHandler(index, l._id, e.target.value)}
              className={
                "outline-0 border rounded py-1 text-xs " +
                (l.status === "pending" ? " text-red-500" : " text-blue-500")
              }
            >
              <option value={"completed"}>Completed</option>
              <option value={"pending"}>Pending</option>
            </select>

            <button
              className="p-1 bg-sky-700 text-white rounded"
              onClick={() => {
                handleDelete(index, l._id);
              }}
            >
              {<MdDelete />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
