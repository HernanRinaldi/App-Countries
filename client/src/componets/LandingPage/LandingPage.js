//-------------IMPORTS----------------//

import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/Styles.css'

//--------------FUNCTION LANDING PAGE------------------//

export default function LandingPage(){

    return(
        <div className='landing'>
            
            <div className='gift-landing'></div>
            <br></br>
            <br></br>
            <h1 className='title-landing'> Countries of the planet earth  </h1>
            <br></br>
            <br></br>
            <Link  to='/home' >
            <button className='button-landing'>Enter your planet</button>
            </Link>
            
        </div>

    )
}