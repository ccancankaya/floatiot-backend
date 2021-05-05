const logDb=require('../models/logIndex')
const Log=logDb.log;

exports.info=(action,message,userId)=>{
    const log=new Log({
        action:action,
        message:message,
        userId:userId,
        type:'info'
    })

    log.save((err,log)=>{
        if(err){
            console.log(err)
            return;
        }
    })
}