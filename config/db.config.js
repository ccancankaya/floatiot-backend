module.exports={
    Host:'localhost',
    User:'postgres',
    Password:'1',
    Db:'testdb',
    dialect:'postgres',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
}