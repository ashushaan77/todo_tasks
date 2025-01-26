import { BrowserRouter, Routes, Route } from "react-router";
import Todo from "./todo_task/todo";
import UserLogin from "./login/userLogin";
import CreateUser from "./login/CreateUser";
import Logout from "./login/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/user/create" element={<CreateUser />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
