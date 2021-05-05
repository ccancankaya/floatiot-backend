const db = require('../models')
const config = require('../config/auth.config')
const User = db.user;
const User_Permission = db.user_permission
const Role = db.role
const Logger=require('../utilities/logger')
var Sequelize = require('sequelize');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


exports.signin = (req, res) => {
  User.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.Password
    )

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid password'
      })
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400//24 hours
    })

    var authorities = [];
    // user.getRoles().then(roles=>{
    //     for(let i=0;i<roles.length;i++){
    //         authorities.push('Role_'+roles[i].name.toUpperCase())
    //     }
    //     res.status(200).send({
    //         id:user.id,
    //         username:user.Username,
    //         accessToken:token
    //     })
    // })
    User.update({
      Last_Login:Sequelize.fn('NOW')
    },{
      where:{
        id:user.id
      }
    }).catch(err=>{
      res.send({message:err})
    })
    Logger.info('sign-in','user was sign in',user.id)
   
    User_Permission.findAll({
        attributes: ['Role_Id'],
        where: {
            User_Id: user.id
        }
        }).then(
        data => {
            Role.findAll({
                attributes: ['name'],
                where: {
                    id: data[0].dataValues.Role_Id
                }
            }).then(role => { //role Role tablosunun bir objesi olarak döner 
                var name = role[0].dataValues.name //bu yüzden objenin içinde ki hedeflediğimiz data yı almalıyız
                console.log(name)
                res.status(200).send({
                  id: user.id,
                  username: user.Username,
                  accessToken: token,
                  role:name
                })
              }).catch(err => {
                res.status(500).send({ message: err.message })
              })
            })
           
          
        }
  )
 
    
}

exports.addUser = (req, res) => {
  User.create({
    Username: req.body.username,
    First_Name: req.body.firstname,
    Last_Name: req.body.lastname,
    Email: req.body.email,
    Email2: req.body.email2,
    Phone_Number: req.body.phone,
    Language: req.body.lang,
    Password: bcrypt.hashSync(req.body.password, 8),
    IsActive: req.body.active,
    Last_Login: req.body.lastlogin
  }).then(user => {
    User_Permission.create({
      User_Id: user.id,
      Role_Id: req.body.roleid,
      Permission_Id: req.body.permissionid,
      Region_Id: req.body.regionid,
      Permission_Level_Id: req.body.permissionlevelid
    }).then(
      res.send({ message: 'User added' })
    )
  }).catch(err => {
    res.status(500).send({ message: err.message })
  })
}

exports.getUsers = (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}

exports.getUser=(req,res)=>{
  User.findByPk(req.params.id).then(user=>{
    res.send(user)
  }).catch(err=>{
    res.status(500).send({message:err})
  })
}

exports.updateUser = (req, res) => {
  User.update({
    Username: req.body.username,
    First_Name: req.body.firstname,
    Last_Name: req.body.lastname,
    Email: req.body.email,
    Email2: req.body.email2,
    Phone_Number: req.body.phone,
    Language: req.body.lang,
    IsActive: req.body.active,
    updatedAt: Sequelize.fn('NOW')
  }, {
    where: {
      id: req.body.userid
    }
  }).then(User_Permission.update({
    Role_Id: req.body.roleid,
    Permission_Id: req.body.permissionid,
    Region_Id: req.body.regionid,
    Permission_Level_Id: req.body.permissionlevelid,
    updatedAt: Sequelize.fn('NOW')
  },
    {
      where: {
        User_Id: req.body.userid
      }
    }).then(
      res.send({ message: 'User updated' })
    )).catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.deleteUser = (req, res) => {
   User.destroy({
    where: {
      User_Id: req.body.userid
    }
  }).then(User_Permission.destroy({
    where: {
      User_Id: req.body.userid
    }
  }).then(
    res.send({ message: 'User deleted' })
  )).catch(err => {
    res.status(500).send({ message: err.message })
  })
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.managerBoard = (req, res) => {
  res.status(200).send("Manager Content.");
};