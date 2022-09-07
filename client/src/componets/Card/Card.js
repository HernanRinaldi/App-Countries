
//---------------IMPORTS---------------//
import React from 'react';

//----------------CSS-------------------//
import  '../Card/CardStyle.css'

//-----------FUCNTION CARD-----------------//
export default function Card( { flags, name, cca3, continents } ){
    
    return(

        <div className='card'>
            
            <img src={ flags } alt='img-Flag' ></img>
            <h3>{ name } </h3>
            <h4>Code: { cca3 }</h4>
            <h4>Continent: { continents }</h4>

        </div>
    )
}

