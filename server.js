const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoDbConfig=require('./config/mongoDb.config')


const app = express();

var whitelist = ['http://localhost:8081','http://localhost:8080','http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// var corsOptions ={
//     origin: 'http://localhost:8081','http://localhost:3000'
// };

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
const db=require('./models');
const logDb=require('./models/logIndex');
const { request } = require('express');
logDb.mongoose.connect(`mongodb://${mongoDbConfig.HOST}:${mongoDbConfig.PORT}/${mongoDbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Successfully connect mongodb')
}).catch(err=>{
    console.error('Connection error',err)
    process.exit()
})



const Role=db.role;
const Permissions=db.permission;

// db.sequelize.sync({force:true}).then(()=>{
//     console.log('Drop and resybc db');
//     initial()
// })

// function initial() {
//     Role.create({
//         id:1,
//         name:'admin'
//     });
//     Role.create({
//         id:2,
//         name:'manager'
//     });
//     Role.create({
//         id:3,
//         name:'user'
//     })
//     Permissions.create({
//         id:1,
//         Permission_Name:'Viewer'
//     })
// }


require('./routes/user.routes')(app);
require('./routes/security.routes')(app);
require('./routes/test.routes')(app)


app.get("/",(req,res)=>{
    res.json({message:'Api works'})
})

const Port=process.env.PORT||8080;
app.listen(Port,()=>{
    console.log('Server is running on port '+Port);
})