//---------------IMPORTS---------------//
import React from "react";
import Search from "../Search/Search";
import "../Nav/Styles.css";

//----------------------------//
export default function Nav() {
  return (
    <div className="gridContainer">
      <div className="navImg"></div>
      <div className="navText">
        <h1>Country Search App</h1>
      </div>
      <Search />
    </div>
  );
}
