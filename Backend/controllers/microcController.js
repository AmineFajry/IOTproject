const MicroController = require('../models/MicroControllerModel')

async function getData(req,res)
{
    try{
        const data = await MicroController.findAll()
        return data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getData};