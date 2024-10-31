import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [username, setUsername] = useState("User");
  const endpoint = import.meta.env.VITE_BACKEND_URL;

  async function fetchInfo() {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${endpoint}/auth/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      const { username } = res.data;
      setUsername(username);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-black text-center text-6xl p-3">Profile</h1>

      <div className="rounded-2xl max-w-96 mt-10 bg-base-200 p-10 shadow-lg flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          Welcome, <span className="font-black">{username}</span>!
        </h1>
      </div>
    </div>
  );
}
