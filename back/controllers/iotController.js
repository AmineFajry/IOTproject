const MicroController = require('../models/MicroControllerModel')
const Badge = require('../models/BadgeModel')


async function getBrightness(req,res){
    const addrMac = req.query.addrMac

    if(!addrMac) {
        res.status(400).json({error:true,message:"addrMac require"})
    }

    const microController = await MicroController.findOne({
        where:{
            addrMac:addrMac
        }
    })


    if(!microController){
        res.status(400).json({error:true,message:"NO_DATA"})
    }else{
        res.status(200).json({error:false,message:microController.seuilLuminosite})
    }
}

async function badgeAccess(req,res){
    const badgeAddr = req.query.badgeAddr

    if(!badgeAddr) {
        res.status(400).json({error:true,message:"badgeAddr require"})
    }

    const badge = await Badge.findOne({
        where:{
            badgeAddress:badgeAddr
        }
    })

    if(!badge){
        res.status(400).json({error:true,message:"NO_DATA"})
    }else{
        res.status(200).json({error:false,message:badge.autorisation})
    }
}

module.exports = {getBrightness,badgeAccess};
