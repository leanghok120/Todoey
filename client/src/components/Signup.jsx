import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form
        className="rounded-2xl max-w-96 mt-10 bg-base-200 p-10 shadow-lg flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Signup</button>
        <Link to={"/login"} className="link mt-4">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}