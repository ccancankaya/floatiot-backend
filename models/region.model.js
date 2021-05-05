module.exports=(sequelize,Sequelize)=>{
    const Region =sequelize.define('Regions',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        Region_Name:{
            type:Sequelize.STRING
        }
    });

    return Region;
}