import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const endpoint = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${endpoint}/auth/signup`, {
        username: username,
        password: password,
      });

      const res = await axios.post(`${endpoint}/auth/login`, {
        username: username,
        password: password,
      });

      localStorage.setItem("token", res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-black text-center text-6xl p-3">Sign Up</h1>
      <form
        className="rounded-2xl max-w-96 mt-10 bg-base-200 p-10 shadow-lg flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Signup</button>
        <Link to={"/login"} className="link mt-4">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
