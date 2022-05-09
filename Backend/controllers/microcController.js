const MicroController = require('../models/MicroControllerModel');

async function data(req,res)
{
    try{
        const data = await MicroController.findAll()
        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}

async function create(req,res)
{
    try{
        let seuilLuminosite = req.body.seuilLuminosite
        let addrMac = req.body.addrMac
        let user_id = req.body.user_id
        let microc = new MicroController({
            seuilLuminosite: seuilLuminosite,
            addrMac: addrMac,
            user_id:user_id
        });

        const microcSave = await microc.save(microc)

    }
    catch(err){
        console.log(err)
    }
}


module.exports = {data,create};