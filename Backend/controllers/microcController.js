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

async function create(req)
{
    let seuil = req.body.seuilLuminosite
    let addr= req.body.addrMac
    let user = req.body.user_id

    let microc = new MicroController({
        seuilLuminosite: seuil,
        addrMac: addr,
        user_id:user
    });

    const microcSave = await microc.save(microc)
    if(!microcSave){
        return {error: true};
    }
    return {addrMac: microc.addrMac,error:false};
}


module.exports = {data,create};