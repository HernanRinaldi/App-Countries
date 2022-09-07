import React  from "react";
import './Styles.css';

export default function Paginated({ countryPerPage, allCountries, paginado}){
    const pageNumbers = []
    //console.log('countries'+ allCountries)
    //console.log('countriesperpage'+ countryPerPage)
    for(let i=0; i < Math.ceil( allCountries/countryPerPage ); i++){
        pageNumbers.push(i + 1);
    }

    // este componente renderiza los numeros de pagina
    //console.log(pageNumbers)
    return (
        <div>
            <ul className="paginado">
                {
                    pageNumbers?.map(number => (

                        <button className="button-paginated" 
                        onClick={() => paginado(number)} 
                        key={number}> {number} </button>
                    ))
                }
            </ul>
        </div>
    )
}