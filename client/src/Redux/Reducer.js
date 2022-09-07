//--------------------IMPORTS---------------------//
import { 
    GET_COUNTRIES,
    SEARCH, 
    ORDER_AZ_ZA,
    ORDER_POPULATION,
    FILTER_CONTINENT,
    FILTER_ID,
    CREATE_ACTIVITY
 } from "./Action";

//-------------STATE FROM BACK----------------------//
const initialState = {
  info_back_countries: [],
  state_filter1: [],
  detail:[],
  countries:[],
  continents:[]
};

//---------------------GET BACK DATA--------------------------//

const rootReducer = (state = initialState, action) => {
  // console.log(state.info_back_countries)
  
  switch (action.type) {
    case GET_COUNTRIES:
      
      return {
        ...state,
        info_back_countries: action.payload,
        state_filter1: action.payload,
        countries: action.payload,
        continents: action.payload
      };
//--------------------SEARCH---------------------------//
    case SEARCH:
      console.log('Info en reducer: ',action.payload)
      return {
        ...state,
        info_back_countries: action.payload,
      };
//-------------------ORDER A-Z/Z-A----------------------------//
    case ORDER_AZ_ZA:
      let sortArr =
        action.payload === "A-Z"
          ? state.info_back_countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.info_back_countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        info_back_countries: sortArr,
      };
//------------------ORDER POPULATION-------------------------//
    case ORDER_POPULATION:
        let orderPopulation =
        action.payload === "Lower Population"
          ? state.info_back_countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.info_back_countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        info_back_countries: orderPopulation,
      };
//--------------------DETAIL---------------------------//     
    case FILTER_ID:
          
          return{
            ...state,
            detail: action.payload
          }
//-------------------FILTER CONTINENT----------------------------//
    case FILTER_CONTINENT:
    console.log('Info en reducer: ',action.payload)  
    state.info_back_countries = state.continents;
    console.log('info a filtrar en reducer: ',state.info_back_countries)
     
 return {
         ...state,
         info_back_countries:  state.info_back_countries?.filter( ele=>ele.continents === action.payload )

       }

//--------------------POST/CREATE ACTIVITY----------------------//
    case CREATE_ACTIVITY:
          return {
            ...state,
          }

    default:
      return state;
  }
};

export default rootReducer;
