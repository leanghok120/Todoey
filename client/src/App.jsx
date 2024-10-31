import Todo from "./components/Todo";
import ProfileBtn from "./components/ProfileBtn";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-5">
      <h1 className="font-black text-center text-6xl p-3">Todo List</h1>
      <Todo />
      <ProfileBtn />
    </div>
  );
}

export default App;
