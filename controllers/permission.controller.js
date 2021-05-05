const db=require('../models')
const Permission=db.permission;
var Sequelize = require('sequelize');
// const Op=db.Sequelize.Op;

exports.addPermission=(req,res) => {
    Permission.create({
        Permission_Name: req.body.name
    }).then(
        res.send({message:'Role added'})
    ).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.getPermissions=(req,res)=>{
    Permission.findAll().then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.getPermission=(req,res)=>{
    Permission.findByPk(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.updatePermission=(req,res)=>{
    Permission.update({
        Permission_Name:req.body.permissionname,
        updatedAt: Sequelize.fn('NOW')
    },{
        where:{
            id:req.body.permissionid
        }
    }).then(
        res.send('Permssion updated')
    ).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.deletePermission=(req,res)=>{
    Permission.destroy({where:{
        id:req.body.permissionid
    }}).
    then(res.send('Permission deleted'))
    .catch(err=>{
        res.status(500).send({message:err})
    })
}