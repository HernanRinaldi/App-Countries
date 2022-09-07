const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    cca3: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The name is not empty'
        }
      }
    },
    flags:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: "The URL don't is validate"
        }
      }
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    subregion: {
      type: DataTypes.STRING,
      
    },
    area: {
      type: DataTypes.INTEGER,
    },
    population: {
      type: DataTypes.INTEGER,
      
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },{timestamps: false});
};