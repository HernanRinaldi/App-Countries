//---------------IMPORTS---------------//
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { filterById } from "../../Redux/Action";
import "../Detail/Styles.css";

//-----------FUCNTION DETAIL-----------------//
export default function Detail() {
  const dispatch = useDispatch();
  const { cca3 } = useParams();
  console.log("este es el id: " + cca3);
  const data_detail = useSelector((state) => state.detail);
  //console.log('info que traigo para detail: ',data_detail)

  //------------------USEEFFECT------------------------//
  useEffect(() => {
    dispatch(filterById(cca3));
  }, [dispatch]);
  //-----------------------RETURN----------------------//
  return (
    <div>
      {data_detail?.map((e, i) => {
        return (
          <div className="grid-container">
            <div className="card" key={i}>
              <img src={e.flags} />
              <h3 className="h3">{e.name}</h3>
              <p className="p">Code: {e.cca3} </p>
              <p className="p">Continent: {e.continents} </p>
              <p className="p">Capital: {e.capital} </p>
              <p className="p">Subregion: {e.subregion} </p>
              <p className="p">Area: {e.area} Km²</p>
              <p className="p">Population:{e.population} Millons</p>

              {/*---------------------------------BUTTON------------------------------- */}
              <Link to="/home">
                <button className="button-detail">Return</button>
              </Link>
              {/*----------------------------ACTIVITY--------------------------------*/}
            </div>
            <div>
              <div className="container-activity">
                {data_detail[0].activities?.map((ele) => (
                  <div className="card-activity">
                    <h3>Activity:</h3>
                    <p>
                      Name: {ele.name} | difficulty: Level {ele.difficulty} |
                      Season: {ele.season} | Duration: {ele.duration} Hs
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
