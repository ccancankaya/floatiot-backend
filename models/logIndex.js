const mongoose=require('mongoose')
mongoose.Promise=global.Promise

const logDb={}

logDb.mongoose=mongoose

logDb.log=require('./log.model')

module.exports=logDb