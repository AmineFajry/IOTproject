const MicroController = require('../models/MicroControllerModel')

async function data(req,res)
{
    try{
        const data = await MicroController.findAll().then((data) => {
            res.json(data);
          });
        return data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {data};