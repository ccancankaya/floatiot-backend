module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        Username: {
            type: Sequelize.STRING
        },
        First_Name: {
            type: Sequelize.STRING
        },
        Last_Name: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        Email2: {
            type: Sequelize.STRING
        },
        Phone_Number:{
            type: Sequelize.NUMERIC
        },
        Language:{
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        },
        IsActive: {
            type: Sequelize.BOOLEAN,
            defaultValue:true
        },
        Last_Login:{
            type: Sequelize.DATE
        }
    });

    return User;
}