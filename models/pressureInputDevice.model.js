module.exports=(sequelize,Sequelize)=>{
    const PressureInputDevice =sequelize.define('866425037886209s',{
        pressure:{
            type:Sequelize.NUMERIC
        },
        time:{
            type:Sequelize.STRING
        }
     
    });

    return PressureInputDevice;
}