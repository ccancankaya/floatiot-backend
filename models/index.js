const config =require('../config/db.config.js');



const Sequelize = require('sequelize');
const sequelize=new Sequelize(
    config.Db,
    config.User,
    config.Password,
    {
        host : config.HOST,
        dialect : config.dialect,
        operatorsAliases:false,

        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
)

const db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.user=require('../models/user.model.js')(sequelize,Sequelize);
db.role=require('../models/role.model.js')(sequelize,Sequelize);
db.permission=require('../models/permission.model.js')(sequelize,Sequelize);
db.permission_level=require('../models/permission_level.model.js')(sequelize,Sequelize)
db.region=require('../models/region.model.js')(sequelize,Sequelize)
db.user_permission=require('../models/user_permission.model.js')(sequelize,Sequelize)
db.analog_input_pressure=require('../models/analogInput.model.js')(sequelize,Sequelize)



db.user_permission.belongsToMany(db.user,{
    through:'user_permissions',
    foreignKey:'User_Id'
});

db.user.belongsToMany(db.user_permission,{
    through:'user_permissions',
    foreignKey:'User_Id'
})

db.ROLES=['admin','manager','user']


module.exports=db;