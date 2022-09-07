//----------------IMPORTS------------------//
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getAllCountries,
  orderByName,
  orderByPopulation,
  filterByContinent,
} from "../../Redux/Action";

//----------------IMPORT COMPONETS-----------//
import Nav from "../Nav/Nav";
import Card from "../Card/Card";
import "../Home/Styles.css";
import Paginated from "../Paginated/Paginated";

//--------------------HOME-----------------//
export default function Home() {
  //------------STATES AND DISPATCH--------------//
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.info_back_countries);

  //console.log('continentes en home: ',cont)

  // USO ==> CONTINENT ==> ACTIVITY
  const [orden, setOrden] = useState(""); // estado de filtro A-Z/Z-A
  const [population, setpopulation] = useState(""); // estado de filtro population
  const [continents, setcontinents] = useState(""); // estado para filtro continent
  //console.log("allCountries", allCountries);

  //-----------------PAGINATED--------------------//
  const [currentPage, setCurrentpage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countryPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
  const currentCountry = allCountries?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  // console.log(currentCountry);
  const paginado = (pageNumber) => {
    setCurrentpage(pageNumber);
  };

  //--------------------- USEEFFFECT----------------------//

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  //--------------- BUTTON-------------//
  function Refresh_countries(e) {
    e.preventDefault();
    dispatch(getAllCountries());
    setCurrentpage(1);
  }
  //----------------HANDLE POPULATION-------------------//
  function handleOrderPopulation(e) {
    console.log(e);
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setpopulation(`Ordenado ${e.target.value}`);
    setCurrentpage(1);
  }
  //-------------HANDLE ORDER A-Z/Z-A ---------------//
  function handleOrder(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentpage(1);
  }
  //--------------HANDLE CONTINENT------------------//
  function handleContinent(e) {
    dispatch(filterByContinent(e.target.value));
    setCurrentpage(1);
  }

  //------------------------RETURN----------------------------//
  return (
    <div>
      {/*----------NAV----------------- */}
      <Nav />
      {/*----------PAGINATED------------ */}

      <div className="paginated">
        <Paginated
          countryPerPage={countryPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
      </div>

      {/*------------- ORDER A-Z/Z-A ---------- */}
      <div>
        <select className="select-home" onChange={(e) => handleOrder(e)}>
          <option>Alphabetical</option>
          <option className="option">A-Z</option>
          <option className="option">Z-A</option>
        </select>

        {/*------------- ORDER POPULATION ---------- */}

        <select
          className="select-home"
          onChange={(e) => handleOrderPopulation(e)}
        >
          <option>Population</option>
          <option className="option">Lower</option>
          <option className="option">Higher</option>
        </select>

        {/*------------- FILTER CONTINENT ---------- */}

        <select className="select-home" onChange={(e) => handleContinent(e)}>
          <option> All Continents</option>
          <option className="option">Africa</option>
          <option className="option">Antarctica</option>
          <option className="option">Asia</option>
          <option className="option">Europe</option>
          <option className="option">North America</option>
          <option className="option">Oceania</option>
          <option className="option">South America</option>
        </select>

        {/*------------ BUTTON ALL COUNTRIES --------------- */}
        <button
          className="button-home"
          onClick={(e) => {
            Refresh_countries(e);
          }}
        >
          All Countries
        </button>

        {/*------------- BUTTON CREATE ---------- */}
        <Link to="/home/create">
          <button className="button-home">Create Activity</button>
        </Link>
      </div>

      {/*--------RENDERING CARDS---------*/}
      <div className="container-body">
        {currentCountry?.map((e, i) => {
          return (
            <div key={i} className="styles-styles-card">
              <Link to={`home/${e.cca3}`}>
                <Card
                  flags={e.flags}
                  name={e.name}
                  cca3={e.cca3}
                  continents={e.continents}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/*---------FOOTER----------------- */}
      {
        <div className="grid-footer">
          <div className="footer-github">Created by Hernan Rinaldi</div>
        </div>
      }
    </div>
  );
}
