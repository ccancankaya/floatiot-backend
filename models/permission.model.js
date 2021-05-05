module.exports=(sequelize,Sequelize)=>{
    const Permission =sequelize.define('Permissons',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        Permission_Name:{
            type:Sequelize.STRING
        }
    });

    return Permission;
}