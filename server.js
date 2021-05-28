const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const mongoDbConfig=require('./config/mongoDb.config')
const axios = require('axios').default
const db=require('./models');
const PressureAnalogInput = db.analog_input_pressure
const PressureInputDevice=db.pressure_input_device
const PressureInputDevice3=db.pressure_input_device3


const app = express();

var whitelist = ['http://localhost:8081','http://localhost:8080','http://localhost:3000','http://192.168.15.101:8081']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//back end başlatılınca her 5 dk da bir float iot en son basınç değerini db ye kaydediyor.
function addAnalogData() {

  const decisionDigit = function (abc) {
      if (abc.length === 1) {
          return '0' + abc;
      } else {
          return abc;
      }
  }

  date_from = new Date().getFullYear().toString() + '-' + decisionDigit((new Date().getMonth() + 1).toString()) + '-' + decisionDigit((new Date().getDate()-1).toString()) + 'T' + decisionDigit(new Date().getHours().toString()) + '%' + '3A' + decisionDigit(new Date().getMinutes().toString()) + '%' + '3A' + '06' + '%' + '2B03' + '%' +
  '3A00'
  date_to=new Date().getFullYear().toString() + '-' + decisionDigit((new Date().getMonth() + 1).toString()) + '-' + decisionDigit(new Date().getDate().toString()) + 'T' + decisionDigit(new Date().getHours().toString()) + '%' + '3A' + decisionDigit(new Date().getMinutes().toString()) + '%' + '3A' + '06' + '%' + '2B03' + '%' +
  '3A00'


  axios.post(
      'https://192.168.12.21/api/v2/token',
      {
          username: "superadmin",
          password: "WaterFlow<1"
      },
      {
          headers: {
              'Authorization': `Bearer 1`,
              'Content-Type': 'application/json'
          }
      }


  ).then((response) => {


    axios.get(`https://192.168.12.21/api/v2/devices/flow-meter-map/messages/device-id/866425037887488?message-type=analog&date-from=${date_from}&date-to=${date_to}`, {
        headers: {
            'Authorization': `Bearer ${response.data.data.token}`,
            'Content-Type': 'application/json'
        }
        })
        .then((response) => {
            PressureInputDevice3.findOrCreate({where:{pressure:Math.abs((response.data[0].json.ANALOG_INPUT - 4)),time:new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")}})
            .then(([value,created])=>{
                console.log(value.get({
                    plain:true
                }))
                console.log(created)
            })
          //   PressureAnalogInput.create({
          //       pressure: Math.abs((response.data[0].json.ANALOG_INPUT - 4)),
          //       time: new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")
          //   })
            console.log('866425037886209 cihazından yeni basınç eklendi : '+(response.data[0].json.ANALOG_INPUT - 4)+' '+new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR"))
        })
        .catch((error) => {
            console.error(error)
        })


    axios.get(`https://192.168.12.21/api/v2/devices/flow-meter-map/messages/device-id/866425037886209?message-type=analog&date-from=${date_from}&date-to=${date_to}`, {
        headers: {
            'Authorization': `Bearer ${response.data.data.token}`,
            'Content-Type': 'application/json'
        }
        })
        .then((response) => {
            PressureInputDevice.findOrCreate({where:{pressure:Math.abs((response.data[0].json.ANALOG_INPUT - 4)),time:new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")}})
            .then(([value,created])=>{
                console.log(value.get({
                    plain:true
                }))
                console.log(created)
            })
          //   PressureAnalogInput.create({
          //       pressure: Math.abs((response.data[0].json.ANALOG_INPUT - 4)),
          //       time: new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")
          //   })
            console.log('866425037886209 cihazından yeni basınç eklendi : '+(response.data[0].json.ANALOG_INPUT - 4)+' '+new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR"))
        })
        .catch((error) => {
            console.error(error)
        })




          axios.get(`https://192.168.12.21/api/v2/devices/flow-meter-map/messages/device-id/868446031292838?message-type=analog&date-from=${date_from}&date-to=${date_to}`, {
              headers: {
                  'Authorization': `Bearer ${response.data.data.token}`,
                  'Content-Type': 'application/json'
              }
              })
              .then((response) => {
                  PressureAnalogInput.findOrCreate({where:{pressure:Math.abs((response.data[0].json.ANALOG_INPUT - 4)),time:new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")}})
                  .then(([value,created])=>{
                      console.log(value.get({
                          plain:true
                      }))
                      console.log(created)
                  })
                //   PressureAnalogInput.create({
                //       pressure: Math.abs((response.data[0].json.ANALOG_INPUT - 4)),
                //       time: new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR")
                //   })
                  console.log('yeni basınç eklendi : '+(response.data[0].json.ANALOG_INPUT - 4)+' '+new Date(response.data[0].json.MEASUREMENT_TIME).toLocaleString("tr-TR"))
              })
              .catch((error) => {
                  console.error(error)
              })
  })


  // PressureAnalogInput.findAll({
  //     limit: 1,
  //     order: [ [ 'createdAt', 'DESC' ]]
  //   }).then(data => {
  //     console.log(data[0].dataValues)
  // })
  //     .catch(err => { console.log(err.message) })



}
setInterval(function(){addAnalogData()} ,300000)

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

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