//-------------------------------//

const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    // defino el modelo para los actibity //
    sequelize.define( 'activity',{
     
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    difficulty:{
        type: DataTypes.INTEGER,
        validator:{min:1, max:5}
    },
    duration:{
        type: DataTypes.STRING,
    },
    season:{
        type: DataTypes.ENUM("summer", "autumn","winter","spring")
    }

},{timestamps:false}); 
}


