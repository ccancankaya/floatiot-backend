module.exports=(sequelize,Sequelize)=>{
    const PressureAnalogInput =sequelize.define('Pressure_Analog_Input',{
        pressure:{
            type:Sequelize.NUMERIC
        },
        time:{
            type:Sequelize.STRING
        }
     
    });

    return PressureAnalogInput;
}