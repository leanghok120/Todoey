import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.svg";

export default function HomeBtn() {
  return (
    <Link className="btn absolute top-5 right-5" to="/">
      <img src={home} alt="home" />
    </Link>
  );
}
