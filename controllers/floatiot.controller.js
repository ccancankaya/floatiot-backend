const db=require('../models')
const PressureAnalogInput=db.analog_input_pressure

var Sequelize = require('sequelize');

const https = require('https')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
var dd={}
var dbd

exports.getData=(req,res)=>{
    var toStart
    var from
    var from1

    if(req.body.toStart === 1 && req.body.from === 1){
            var time=new Date().getHours()
            var time2
            toStart='2021-04-24T13%3A57%3A09%2B03%3A00'
            if(time.toString().length===1){
                time2='0'+time.toString()
                from=new Date().getFullYear().toString()+'-'+'0'+(new Date().getMonth()+1).toString()+'-'+
                '0'+new Date().getDate().toString()+'T'+time2+'%'+'3A'+new Date().getMinutes().toString()+'%'+'3A'+'00'+'%'+'2B00'+'%'+
                '3A00'
                console.log(from1)
                // new Date().getMinutes().toString()+'+03:00'
            }else{
                 from=new Date().getFullYear().toString()+'-'+'0'+(new Date().getMonth()+1).toString()+'-'+
                '0'+new Date().getDate().toString()+'T'+new Date().getHours().toString()+'%'+'3A'+new Date().getMinutes().toString()+'%'+'3A'+'00'+'%'+'2B00'+'%'+
                '3A00'
                
            }

            // from=new Date().getFullYear().toString()+'-'+'0'+new Date().getMonth().toString()+'-'+
            // '0'+new Date().getDay().toString()+'T'+'0'+new Date().getHours().toString()+':'+
            // new Date().getMinutes().toString()+'+03:00'

            // from='2021-05-05T11%3A57%3A09%2B03%3A00'
    }else{
        toStart=req.body.toStart
        from=req.body.from
    }

    const data = JSON.stringify({
        username: 'superadmin',
        password: 'WaterFlow<1'
            })
        
            const options1 = {
                hostname: '192.168.12.21',
                path: '/api/v2/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    'Authorization': 'Bearer 1'
                }
            }
        
            const request1 = https.request(options1, response => {
                // console.log(`statusCode: ${response.statusCode}`)
                response.on('data', d => {
                    dd = JSON.parse(d)
                })  
        
                response.on('end', () => {                     
                                    const options = {
                                        hostname: '192.168.12.21',
                                        //   port: 443,
                                        path: `/api/v2/devices/flow-meter-map/attribute/ANALOG_INPUT/detailed-time-series?query=&date-from=${toStart}&date-to=${from}`,
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${dd.data.token}`
                                        }
                                    }
                                
                                    const request = https.request(options, response => {
                                        console.log(`statusCode: ${response.statusCode}`)
                                
                                        response.on('data', d => {
                                            dbd =JSON.parse(d)
                                        })
                                
                                        response.on('end', () => {
                                            var values= dbd.series[Object.keys(dbd.series)[0]];
                                            console.log(values)
                                            res.send(values)
                                        })
                                    })
                                
                                    request.on('error', error => {
                                        res.send(dbd)
                                    })
                                
                                    request.end()
                })
            })
        
            request1.on('error', error => {
                console.error(error)
                res.send(error)
            })
        
            request1.write(data)
            request1.end()
}