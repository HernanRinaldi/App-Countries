//---------------IMPORTS---------------//
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { search_name } from "../../Redux/Action";
import "../Search/Styles.css";

//--------------FUNCTION-----------------//
export default function Search() {
  //--------------STATE------------------//
  const dispatch = useDispatch();
  const [input, setinput] = useState("");

  //--------------handleOnChange--------------------//
  const handleOnChange = (e) => {
    e.preventDefault();
    setinput(e.target.value);
    console.log("estado:" + input);
  };
  //--------------handleOnChange--------------------//
  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    dispatch(search_name(input));
    setinput("");
  };
  //----------------RETURN------------------//
  return (
    <div>
      <input
        className="input-search"
        placeholder="Name..."
        type="text"
        autoFocus
        onChange={(e) => handleOnChange(e)}
      ></input>

      <button className="button-search" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
