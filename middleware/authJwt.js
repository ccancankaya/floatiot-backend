const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const User_Permission = db.user_permission
const Role = db.role
const { Op } = require("sequelize");


verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token available' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized ' + err })
        }

        req.userId = decoded.id;
        next();
    })

}

isAdmin = (req, res, next) => {
    User_Permission.findAll({
        attributes: ['Role_Id'],
        where: {
            User_Id: req.userId
        }
    }).then(
        data => {
            Role.findAll({
                attributes: ['name'],
                where: {
                    id: data[0].dataValues.Role_Id
                }
            }).then(role => { //role Role tablosunun bir objesi olarak döner 
                let name = role[0].dataValues.name //bu yüzden objenin içinde ki hedeflediğimiz data yı almalıyız
                if (name === 'admin') {
                    next();
                    return;
                } else {
                    res.status(403).send({
                        message: 'Require admin role'
                    })

                }
            }).catch(err => {
                res.status(500).send({ message: err })
            })
            return;

        }
    ).catch(err => {
        res.status(500).send({ message: err })
    })
    return;
}

isManager = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'manager') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require manager role'
            })
        })
    })
}

isManagerOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'manager') {
                    next();
                    return;
                }

                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: 'Require admin or manager'
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isManager: isManager,
    isManagerOrAdmin: isManagerOrAdmin
}

module.exports = authJwt;