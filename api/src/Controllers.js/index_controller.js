//-----------------IMPORTS------------------------//
const { Country, Activity, Op } = require("../db");
const axios = require("axios");

//---------------ENDPOINTS------------------------//
const API = `https://restcountries.com/v3/all`;

//------------GET COUNTRIES------------//
const getAllCountries= async(req, res)=> {

  const { name } = req.query;
  try{ 
  if (!name) {
    const BD = await Country.findAll({
      attributes: ["cca3", "name", "flags", "continents", "population"],
      include: [
        {
          model: Activity,
          attributes: ["name", "difficulty", "duration", "season"],
        },
      ],
    }); 
    // SI EN LA BASE DE DATOS TENGO INFO //
    if (BD.length > 0) {
      return res.status(200).send(BD);
    } else {
    // SI NO TENGO INFO EN BASE DE DATOS //
      const allCountries = await axios.get(API);
      const pais = allCountries.data.map((e) => {
        return {
          cca3: e.cca3,
          name: e.name.common,
          flags: e.flags[1],
          continents: e.continents[0],
          capital: e.capital != null ? e.capital[0] : "No data",
          subregion: e.subregion,
          area: e.area / 1000000,
          population: e.population,
        };
      });
      // si hay info traida de API, cargo en base de datos //
      const filterCountry = pais?.filter((c) => c !== undefined);
      await Country.bulkCreate(filterCountry, { validate: true });
      //  en BD : cargo la informacion que tengo en la base de datos //
      BD = await Country.findAll({
        attributes: ["cca3", "name", "flags", "continents", "population"],
        include: [
          {
            model: Activity,
            attributes: ["name"],
          },
        ],
      });

      return res.status(200).send(BD);
    }
  }
  // BUSCO EN BASE DE DATOS X NAME CUANDO ME LLEGA POR QUERY /SEARCH //
  const countryDB = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return res.status(200).send(countryDB);
}catch(e){
  res.send({e:'Error when loading countries'})
}
}

//--------------GET BY ID-------------//
const getApiId = async (req, res) => {
  // code= cca3 ==>> SON LAS 3 PRIMERAS LETRAS DEL NAME EN MAYUSCULAS //

  const { cca3 } = req.params;

    try { 
      const id= await Country.findAll({
        where:{
          cca3: {
            [Op.iLike]: `%${cca3}%`,
          },
        },
        include:{
          model: Activity,
          attributes:["name","difficulty", "duration","season"],
          through:{
            attributes:[]
          }
        } 
      });
      id.length > 0 ?  res.send(id) : res.json({e:'error al buscar por id'})
     
    } catch (error) {
      res.send({error:'Error when you search by id'})
    }
      
};
//-----------POST ACTIVITY-----------//
const createActivity = async (req, res,next) => {
  let { name, difficulty, duration, season, country } = req.body;
  try {
    // cargo las propiedades en el model activity //
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season 
    });
    // busco en el model Country la propiedad name que este incluida //
    const findAct = await Country.findAll({
      where:{
        name:{
          [Op.in] :country
        } 
      }
    })
    // ASOCIO LA ACTIVIDAD AL PAIS //
     findAct?.map(e =>{
      newActivity.addCountry(e)
     })
    return res.send(newActivity)

  } catch (error) {
    res.send({error:'Error when you created Activity'})
  }
};

module.exports = {getAllCountries, getApiId, createActivity};

