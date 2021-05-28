const userController =require('../controllers/user.controller');
const roleController =require('../controllers/role.controller');
const regionController =require('../controllers/region.controller');
const permissionController =require('../controllers/permission.controller');
const perLevController =require('../controllers/permission_level.controller');
const flotiotController = require('../controllers/floatiot.controller')
const {verifySignUp}=require('../middleware');
const {authJwt} = require('../middleware');


module.exports =function(app){
    app.use(function(req, res,next){
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token,Origin,Content-Type,Accept'
            );
            next();
    });

    //user
    //User can login in system
    app.post('/api/security/signin',userController.signin)

    app.post('/api/security/getpressure',[authJwt.verifyToken],flotiotController.getData)
    app.post('/api/security/devicename',[authJwt.verifyToken],flotiotController.updateDeviceName)

    app.get('/api/security/getdevices',[authJwt.verifyToken],flotiotController.getDevices)


    //Admin can add new user at system (with users's permission,region,role,level)
    app.post('/api/security/useradd',authJwt.verifyToken,authJwt.isAdmin,[
        verifySignUp.checkDuplicateUsernameOrEmail
    ],userController.addUser);

    app.get('/api/security/getusers',[authJwt.verifyToken, authJwt.isAdmin],userController.getUsers);

    app.get('/api/security/getuser/:id',userController.getUser);

    //This route can update user information by admin
    app.post('/api/security/userupdate',authJwt.verifyToken,userController.updateUser);

    app.delete('/api/security/userdelete',userController.deleteUser)

  
    //Role
    //Admin can add new role
    app.post('/api/security/roleadd',authJwt.verifyToken,authJwt.isAdmin,function(req,res){roleController.role})
    app.get('/api/security/getroles',roleController.getRoles)
    app.get('/api/security/getrole/:id',roleController.getRole)
    app.post('/api/security/roleupdate',roleController.updateRole)
    app.delete('/api/security/roledelete',roleController.deleteRole)

    //Region
    //Admin can add new region
    app.post('/api/security/regionadd',authJwt.verifyToken,authJwt.isAdmin,function(req,res){regionController.region})
    app.get('/api/security/getregions',regionController.getRegions)
    app.get('/api/security/getregion/:id',regionController.getRegion)
    app.post('/api/security/regionupdate',regionController.updateRegion)
    app.delete('/api/security/regiondelete',regionController.deleteRegion)


    //Permission
    //Admin can add new permission
    app.post('/api/security/permissionadd',authJwt.verifyToken,authJwt.isAdmin,function(req,res){permissionController.permission})
    app.get('/api/security/getpermissions',permissionController.getPermissions)
    app.get('/api/security/getpermission',permissionController.getPermission)
    app.post('/api/security/permissionupdate',permissionController.updatePermission)
    app.delete('/api/security/permissiondelete',permissionController.deletePermission)

    
    //Permission level
    //Admin can add new permission level
    app.post('/api/security/permissionleveladd',authJwt.verifyToken,authJwt.isAdmin,function(req,res){perLevController.permission_level})
    app.get('/api/security/getpermissionlevels',perLevController.getPermissionLevels)
    app.get('/api/security/getpermissionlevel',perLevController.getPermissionLevel)
    app.post('/api/security/permissionlevelupdate',perLevController.updatePermissionLevel)
    app.delete('/api/security/permissionleveldelete',perLevController.deletePermissionLevel)

}