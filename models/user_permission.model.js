module.exports=(sequelize,Sequelize)=>{
    const User_Permission =sequelize.define('User_Permissions',{
        User_Id:{
            type:Sequelize.INTEGER
        },
        Role_Id:{
            type:Sequelize.INTEGER
        },
        Permission_Id:{
            type:Sequelize.INTEGER
        },
        Region_Id:{
            type:Sequelize.INTEGER
        },
        Permission_Level_Id:{
            type:Sequelize.INTEGER
        }
    });

    return User_Permission;
}