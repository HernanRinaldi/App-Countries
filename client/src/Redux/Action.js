
//-------------------IMPORTS------------------//
import axios from 'axios';

//------------------VARIABLES-----------------//
export const GET_COUNTRIES= "GET_COUNTRIES";
export const SEARCH= "SEARCH";
export const ORDER_AZ_ZA= "ORDER_AZ_ZA";
export const ORDER_POPULATION="ORDER_POPULATION";
export const FILTER_CONTINENT="FILTER_CONTINENT";
export const FILTER_ID= "FILTER_ID";
export const CREATE_ACTIVITY="CREATE_ACTIVITY";

//------------------URLS-------------------------//
const URL = "http://localhost:3001/countries";
const URL1 = "http://localhost:3001/countries?name=";

//------------------FUNCTIONS--------------------//

//--------------------INFO BACK------------------//
export const getAllCountries= ()=>{
    
return async function(dispatch){
    //--------tipo fetch-------//
    // let infoBack= await fetch(URL)
    // let parseado= infoBack.json()
    let infoBack= await axios.get(URL)
    //console.log(infoBack.data)
    return dispatch({
        type: GET_COUNTRIES,
        payload: infoBack.data
    })
}
}
//---------------FUNCTION SEARCH--------------//
export const search_name= (payload)=>{

    try {
        return async function(dispatch){
            // query //
            let info= await axios.get(URL1 + payload)
            console.log('Info llega del back: ', info.data)
            return dispatch({
                type: SEARCH,
                payload: info.data
            })
        }
    } catch (e) {
        console.log('Error when search name')
    }
}

//----------------ORDER A-Z/Z-A --------------------//
export const orderByName= function(payload){
    return{
      type: ORDER_AZ_ZA,
      payload
    }
  }
//----------------ORDER POPULATION-------------------//
export const orderByPopulation= function(payload){
    return{
        type: ORDER_POPULATION,
        payload
    }
}
//---------------FILTER CONTINENT------------------//
export const filterByContinent= function(payload){
    console.log('Info en action: ',payload)
    return{
        type: FILTER_CONTINENT,
        payload
    }
}

//--------------------DETAIL-----------------------//
export const filterById= function( cca3 ){
    return async function( dispatch ){
        const detail= await axios.get( `http://localhost:3001/countries/${cca3}` )
        //console.log(detail.data)
        return dispatch({
            type: FILTER_ID,
            payload: detail.data
        })
    }
}
//---------------CREATE ACTIVITY-----------------//
export const createActivity= function(payload){
    try {
        return async function(){
            let newActivity= await axios.post("http://localhost:3001/countries/create",payload)
            //console.log('Info desde el back: ',newActivity.data)
            //console.log('Soy newActivity: ',newActivity)
            alert('Activity created !!!')
            return newActivity;
            }
    } catch (error) {
        alert('Error al crear la actividad')
    } 
    
    }


