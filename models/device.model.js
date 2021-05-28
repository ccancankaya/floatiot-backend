module.exports = (sequelize,Sequelize) => {
    const Device = sequelize.define('Devices', {
        Imei: {
            type: Sequelize.NUMERIC
        },
        Device_Name: {
            type: Sequelize.STRING,
            allowNull:true
        },
        X:{
            type:Sequelize.NUMERIC,
            allowNull:true
        },
        Y:{
            type:Sequelize.NUMERIC,
            allowNull:true
        },
        Last_Online_Time: {
            type: Sequelize.NUMERIC,
            allowNull:true
        },
        Firmware_Version:{
            type:Sequelize.STRING,
            allowNull:true
        }
    });

    return Device;
}