const db = require('../models')
const Role = db.role;
var Sequelize = require('sequelize');

// const Op=db.Sequelize.Op;

exports.addRole = (req, res) => {
    Role.create({
        name: req.body.name,
        description: req.body.description
    }).then(
        res.send({ message: 'Role added' })
    ).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.getRoles = (req, res) => {
    Role.findAll().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: err })
    })
}

exports.getRole = (req, res) => {
    Role.findByPk(req.params.id).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({ message: err })
    })
}

exports.updateRole = (req, res) => {
    Role.update({
        name: req.body.name,
        description: req.body.description,
        updatedAt: Sequelize.fn('NOW')
    }, {
        where: {
            id: req.body.roleid
        }
    }).then(
        res.send({ message: 'Role updated' })
    ).catch(err => {
        res.status(500).send({ message: err })
    })
}

exports.deleteRole = (req, res) => {
    Role.destroy({
        where: {
            id: req.body.roleid
        }
    })
        .then(res.send('Role deleted'))
        .catch(err => {
            res.status(500).send({ message: err })
        })
}