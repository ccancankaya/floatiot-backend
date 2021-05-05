const db=require('../models')
const Region=db.region;
var Sequelize = require('sequelize');

// const Op=db.Sequelize.Op;

exports.addRegion=(req,res) => {
    Region.create({
        Region_Name: req.body.name
    }).then(
        res.send({message:'Region added'})
    ).catch(err=>{
        res.status(500).send({message:err.message})
    })
}

exports.getRegions=(req,res)=>{
    Region.findAll()
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.getRegion=(req,res)=>{
    Region.findByPk(req.params.id).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send({message:err})
    })
}

exports.updateRegion=(req,res)=>{
    Region.update({
        Region_Name:req.body.regionname,
        updatedAt: Sequelize.fn('NOW')
    },{
        where:{
            id:req.body.regionid
        }
    }).then(
        res.send('Region updated')
    ).catch(err=>{
        res.status(500).send({message:err})
    })
}

exports.deleteRegion=(req,res)=>{
    Region.destroy({
        where:{
            id:req.body.regionid
        }
    }).then(
        res.send('Region deleted')
    ).catch(err=>{
        res.status(500).send({message:err})
    })
}