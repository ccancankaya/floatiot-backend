module.exports=(sequelize,Sequelize)=>{
    const Permission_Level =sequelize.define('Permission_Levels',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        Level_Name:{
            type:Sequelize.STRING
        }
    });

    return Permission_Level;
}