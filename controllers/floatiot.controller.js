const db = require('../models')
const Device = db.device
const axios = require('axios').default
const Sequelize = require('sequelize');
const PressureAnalogInput = db.analog_input_pressure
const PressureInputDevice = db.pressure_input_device
const PressureInputDevice3 = db.pressure_input_device3
const { Op } = require("sequelize");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var token
var imei
var selectedStartDate
var selectedEndDate


exports.getDevices = (req, res) => {

    //float iot için token alır. Her sayfa başlatıldığında yapılmalıdır.
    axios.post('https://192.168.12.21/api/v2/token',
        { username: 'superadmin', password: 'WaterFlow<1' },
        { headers: { "Authorization": "Bearer 1", "Content-Type": "application/json" } })
        .then(response => token = response.data)
        .catch(err => res.send(err))

    //cihazları float iot backend den çekip veritabanına yazdırır. 1 kere yaptırmak yeterlidir.
    // axios.get('https://192.168.12.21/api/v2/devices/list/?offset=0&query=&date-from=2021-05-22T08%3A31%3A57%2B03%3A00&date-to=2021-05-27T08%3A31%3A57%2B03%3A00&topic&topicValue',
    // {headers:{'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`}})
    // .then(response=>
    //     {
    //         for(var i=0;i<response.data.devices.length;i++){
    //             Device.create({
    //                 Imei: response.data.devices[i].imei,
    //                 Device_Name: null,
    //                 X:null,
    //                 Y:null,
    //                 Last_Online_Time: response.data.devices[i].lastOnlineTime
    //               })
    //               .then(message='device added')
    //               .catch(err => {
    //                 message= err.message
    //               })
    //             }
    //         res.send('devicese added')
    //     })
    // .catch(err=>res.send(err.message))

    //cihazları veritabanından çeker ve client a gönderir. Her sayfa açılışında yapılır.
    Device.findAll().then(data => res.send(data)).catch(err => res.send(err))

}

exports.getData = (req, res) => {

    const decisionDigit = function (abc) {
        if (abc.length === 1) {
            return '0' + abc;
        } else {
            return abc;
        }
    }

    if (req.body.start == "1" && req.body.to == "1") {
        selectedStartDate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1) + '-' + decisionDigit((new Date().getDate() - 1).toString()) + ' ' + decisionDigit(new Date().getHours().toString()) + ':' + decisionDigit(new Date().getMinutes().toString()) + ':' + decisionDigit(new Date().getSeconds().toString())
        selectedEndDate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1) + '-' + decisionDigit((new Date().getDate()).toString()) + ' ' + decisionDigit(new Date().getHours().toString()) + ':' + decisionDigit(new Date().getMinutes().toString()) + ':' + decisionDigit(new Date().getSeconds().toString())

        if (req.body.imei) {
            imei = req.body.imei
        } else {
            imei = '868446031292838'
        }

        console.log(imei)
    }
    else {
        console.log("else bloguna girdi")
        if (req.body.imei) {
            imei = req.body.imei
            console.log("if içine girdi")

        }

        function formatDate(date) {
            var a = date.replace(
                date.substring(11, 14),
                decisionDigit((parseInt(date.substring(11, 13), 10) + 3).toString()) + ':'
            );
            var b = a.replace(a.substring(5, 7), a.substring(5, 7)[1]);
            var c = b.replace("T", " ");
            var d = c.substring(0, 18);

            return d;
        }

        selectedStartDate = formatDate(req.body.start)
        selectedEndDate = formatDate(req.body.to)

        console.log(selectedStartDate)
        console.log(imei)
    }

    if (imei == '866425037886209') {
        PressureInputDevice.findAll({
            where: {
                time: {
                    [Op.between]: [
                        selectedStartDate,
                        selectedEndDate
                    ]
                }



            },
            order: [['createdAt', 'DESC']]
        })
            .then(data => {
                if (data == []) {
                    console.log('dsasadsa')
                    res.send(data)

                } else {
                    res.send(data)
                }
            })
            .catch(err => { console.log(err.message) })

    } else if (imei == '866425037887488') {
        PressureInputDevice3.findAll({
            where: {
                time: {
                    [Op.between]: [
                        selectedStartDate,
                        selectedEndDate
                    ]
                }



            },
            order: [['createdAt', 'DESC']]
        })
            .then(data => {
                if (data == []) {
                    console.log('dsasadsa')
                    res.send(data)

                } else {
                    res.send(data)
                }
            })
            .catch(err => { console.log(err.message) })
    } else if (imei == '868446031292838') {
        PressureAnalogInput.findAll({
            where: {
                time: {
                    [Op.between]: [
                        selectedStartDate,
                        selectedEndDate
                    ]
                }



            },
            order: [['createdAt', 'DESC']]
        })
            .then(data => {
                if (data == []) {
                    console.log('dsasadsa')
                    res.send(data)

                } else {
                    res.send(data)
                }
            })
            .catch(err => { console.log(err.message) })
    }

    // res.status(500).send({ message: 'Hatalı bir istek gönderdiniz!!' })


}

exports.updateDeviceName = (req, res) => {

    Device.update({
        Device_Name: req.body.devicename
    }, {
        where: {
            Imei: req.body.imei
        }
    }).then(res.send({ message: 'device name changed' })).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

// her 1 saatte 12 tane 
// 16 saatte 192 tane
// 16 saat 44 da 200 tane yeni veri