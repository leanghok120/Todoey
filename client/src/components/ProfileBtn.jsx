import React from "react";
import { Link } from "react-router-dom";
import user from "../assets/user.svg";

export default function ProfileBtn() {
  let page = "/signup";
  const token = localStorage.getItem("token");
  if (token) {
    page = "/profile";
  }

  return (
    <Link className="btn absolute top-5 right-5" to={page}>
      <img src={user} alt="account" />
    </Link>
  );
}
