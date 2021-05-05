const db=require('../models')
const Permission_Level=db.permission_level;
var Sequelize = require('sequelize');

// const Op=db.Sequelize.Op;

exports.addPermissionLevel=(req,res) => {
    Permission_Level.create({
        Permission_Name: req.body.name
    }).then(
        res.send({message:'Permission level added'})
    ).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.getPermissionLevels=(req,res)=>{
    Permission_Level.findAll()
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send({message:err})
    })
}

exports.getPermissionLevel=(req,res)=>{
    Permission_Level.findByPk(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.updatePermissionLevel=(req,res)=>{
    Permission_Level.update({
        Level_Name:req.body.levelname,
        updatedAt: Sequelize.fn('NOW')
    },{
        where:{
            id:req.body.permissionlevelid
        }
    }).then(
        res.send('Permission level updated')
    ).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.deletePermissionLevel=(req,res)=>{
    Permission_Level.destroy({
        where:{
            id:req.body.id
        }
    }).then(
        res.send('Prmission level deleted')
    ).catch(err=>{
        res.status(500).send({message:err})
    })
}