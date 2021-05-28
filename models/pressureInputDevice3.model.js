module.exports=(sequelize,Sequelize)=>{
    const PressureInputDevice3 =sequelize.define('866425037887488s',{
        pressure:{
            type:Sequelize.NUMERIC
        },
        time:{
            type:Sequelize.STRING
        }
     
    });

    return PressureInputDevice3;
}