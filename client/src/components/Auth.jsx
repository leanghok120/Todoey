import React from "react";

export default function Auth() {
  return (
    <form
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
    </form>
  );
}
