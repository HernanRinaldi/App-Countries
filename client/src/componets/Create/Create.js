//-----------------IMPORTS---------------//
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createActivity, getAllCountries } from "../../Redux/Action";
import { Link } from "react-router-dom";
import "../Create/Styles.css";

//-----------------FUNCTION VALIDATE INPUTS----------------//
function validate(input) {
  let errors = {};
  if (!input.country[0]) {
    errors.country = "Select a country";
  }
  if (input.name.length < 3 && input.name.length > 15) {
    errors.name = "Write a tourist activity";
  }
  if (input.duration <= 0 || input.duration > 24) {
    errors.duration = "Duration of the tourist activity (hs)";
  }
  if (!input.season) {
    errors.season = 'Write: "winter" or "summer" or "spring" or "autumn"';
  }
  if (!input.difficulty) {
    errors.difficulty = "Add difficulty";
  }
  return errors;
}

//----------------------------FUNCTION CREATE----------------//
export default function Create() {
  //-------------------------- STATE ------------------------//
  const dispatch = useDispatch();
  const mapCountry = useSelector((state) => state.countries);
  //console.log(mapCountry)

  const [input, setinput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });
  //------------------------USEEFECT----------------------//
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  //---------------------STATE ERRRORS---------------------//
  const [errors, seterrors] = useState({});

  //---------------HANDLE INPUT CHANGE------------------//
  const handleInputChange = (e) => {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
    //------------------SET ERRORS-------------------------//
    seterrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  };
  //--------------- HANDLE COUNTRY ----------------------//
  const handleCountry = (e) => {
    setinput({
      ...input,
      country: [...input.country, e.target.value],
    });
  };

  const handleChangeS = (e) => {
    setinput({
      ...input,
      season: e.target.value,
    });
    seterrors(validate(input));
  };
  //-----------------HANDLE DELETE-----------------------------//
  function handleDelete(ele) {
    setinput({
      ...input,
      country: input.country.filter((country) => country !== ele),
    });
  }
  //--------------------------FUNCTION DISABLED BUTTON----------------//
  function invalidAdd(input) {
    let error = validate(input);
    if (
      error.name ||
      error.difficulty ||
      error.duration ||
      error.season ||
      error.country
    )
      return true;
  }

  //------------------------------HANDLE SUBMIT-----------------------//
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //console.log('Info hacia action:',input)
    dispatch(createActivity(input));
    setinput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
  };

  //----------------------------------RETURN------------------------------//
  return (
    <div className="form-container">
      {/*-----------------------------FORMULARIO---------------------------- */}

      <h1 className="h1">Activity form</h1>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        {/*---------------------------select country---------------------- */}
        <select className="select-countries" onChange={(e) => handleCountry(e)}>
          {mapCountry?.map((ele, i) => {
            return (
              <option value={ele.name} key={i}>
                {" "}
                {ele.name}{" "}
              </option>
            );
          })}
        </select>
        {/*-------------------VIEWS THE SELECTED-------------- */}

        {input.country?.map((ele) => (
          <div className="div-cont">
            <p className="value-select">{ele}</p>
            <button className="button-delete" onClick={() => handleDelete(ele)}>
              x
            </button>
          </div>
        ))}
        {validate(input).country ? (
          <p className="error">Select a country</p>
        ) : (
          <p></p>
        )}
        {/*-------------------------INPUTS---------------------------- */}
        <div>
          <label className="label"></label>
          <input
            className="input-form"
            placeholder="Name..."
            type="text"
            name="name"
            autoFocus
            size="25"
            onChange={(e) => handleInputChange(e)}
            value={input.name}
          ></input>
          {/*-----------------------RENDER ERRORS--------------------- */}

          {validate(input).name ? (
            <p className="errores">'Write the Activity'</p>
          ) : (
            <p></p>
          )}
        </div>
        <br />

        <div>
          <label className="label"></label>
          <input
            className="input-form"
            placeholder="Duration..."
            type="number"
            min="1"
            name="duration"
            size="25"
            onChange={(e) => handleInputChange(e)}
            value={input.duration}
          ></input>
          {/*---------------------RENDER ERRORS-------------------- */}
          {errors.duration && <p className="error"> {errors.duration}</p>}
        </div>
        <br />

        <div>
          <label className="label"></label>
          <select className="select-season" onChange={(e) => handleChangeS(e)}>
            <option>Season...</option>
            <option name="season">summer</option>
            <option name="season">winter</option>
            <option name="season">spring</option>
            <option name="season">autumn</option>
          </select>

          {/*----------------------RENDER ERRORS-------------------- */}
        </div>
        {validate(input).season ? (
          <p className="error">
            '"winter" or "summer" or "spring" or "autumn"'
          </p>
        ) : (
          <p></p>
        )}
        <br />

        <div>
          <label className="label">Difficulty: </label>
          <input
            placeholder="..."
            type="range"
            min="1"
            max="5"
            name="difficulty"
            size="25"
            onChange={(e) => handleInputChange(e)}
            value={input.difficulty}
          ></input>
          {/*-------------------VIEWS THE SELECTED-------------- */}
          <p className="value">Value: {input.difficulty} </p>
        </div>
        {/*-----------------------BUTTONS----------------------------- */}

        <div>
          <button
            type="Submit"
            className="button-form"
            disabled={invalidAdd(input)}
          >
            Create
          </button>

          <Link to="/home">
            <button className="button-form">Return</button>
          </Link>
          <p className="error">Important!! </p>

          <p className="error">
            {" "}
            It is required to complete all the fields to send the form{" "}
          </p>
        </div>
      </form>
    </div>
  );
}
