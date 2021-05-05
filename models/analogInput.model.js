module.exports=(sequelize,Sequelize)=>{
    const PressureAnalogInput =sequelize.define('pressure_analog_input',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        time:{
            type:Sequelize.DATE
        },
        pressure:{
            type:Sequelize.NUMERIC
        }
    });

    return PressureAnalogInput;
}