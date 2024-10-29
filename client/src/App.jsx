import Todo from "./components/Todo";
import { Link } from "react-router-dom";
import user from "./assets/user.svg";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-5">
      <Link className="btn absolute top-5 right-5" to={"/signup"}>
        <img src={user} alt="account" />
      </Link>
      <h1 className="font-black text-center text-6xl p-3">Todo List</h1>
      <Todo />
    </div>
  );
}

export default App;
