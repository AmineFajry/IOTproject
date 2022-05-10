const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const MicroController = require('../models/MicroControllerModel')
const Badge = require('../models/BadgeModel')
const User = require('../models/UserModel')
const Historic = require('../models/HistoricModel')

async function login(req, res)
{
    const email = req.body.email;
    const password = req.body.password;

    const userFind = await User.findOne({
        where: { 
            email: email
        }
    })
    if(!userFind){
        const result = await createUser({email, password})
        res.status(200).json(result);
    }else {
        const result = await updateToken({userFind, password})
        res.status(200).json(result);
    }
}

async function createUser({email, password})
{
    const hash = await bcrypt.hash(password,10)
    let user = new User({
        email: email,
        password: hash,
    });
    const token = await jwt.sign({email: user.email}, 'secret_key');
    user.token = token
    const userSave = await user.save(user)
    if(!userSave){
        return {error: true};
    }
    return {id:userSave.id,email: userSave.email, token,error:false};
}

async function updateToken({userFind, password})
{
    let isValid = await bcrypt.compare(password, userFind.password)
    if(isValid) {
        const token = await jwt.sign({email: userFind.email}, 'secret_key');
        userFind.token = token
        const userSave = await userFind.save()
        return {id:userFind.id, email: userFind.email, token,error:false};
    }
    else {
        return {error: true};
    }
}

async function logout(req,res){
    const email = req.body.email;
    const userFind = await User.findOne({
        where: {
            email: email
        }
    })
    userFind.token = null
    const userSave = await userFind.save()
    res.status(200).json({error:false});
}

// badge //
async function getListBadge(req,res){
    try {
        const email = req.query.email
        const user = await User.findOne({
            where:{
                email:email
            },
            include:[
                {
                    model:Badge,
                    as:"user_badge"
                },

            ]
        })
        res.status(200).json({error:false,message:user.user_badge});
    }catch (e) {
        console.log(e)
    }
}

async function getListAccess(req,res){
    try {
        const email = req.query.email
        const user = await User.findOne({
            where:{
                email:email
            },
            include:[
                {
                    model:MicroController,
                    as:'user_microc',
                    include:[
                        {
                            model:Historic
                        }
                    ]
                },
            ]
        })
        res.status(200).json({error:false,message:user.user_microc});
    }catch (e) {
        console.log(e)
    }
}

async function updateBadgeAccess(req,res){
    const data = req.body
    const badge = await Badge.findOne({
        where:{
            badgeAddress : data.badgeAddress
        }
    })

    badge.autorisation = data.autorisation
    const badgeSaved = await badge.save()

    if(!badgeSaved){
        res.status(400).json({error:true,message:'DATA_NO_FOUND'})
    }else{
        res.status(200).json({error:false,message:badgeSaved})
    }
}

async function createBadge(req,res){
    const data = req.body.badge

    const badge = await Badge.create(data)

    if(!badge){
        res.status(400).json({error:true,message:'DATA_NO_SAVE'})
    }else{
        res.status(200).json({error:false,message:badge})
    }
}

async function editBadge(req,res){
    const data = req.body.badge
    console.log(data)

    const badge = await Badge.findOne({
        where:{
            id:data.id
        }
    })
    badge.set(data);
    if(!badge){
        res.status(400).json({error:true,message:'DATA_NO_SAVE'})
    }else{
        const badgeSaved = await badge.save()
        console.log(badgeSaved)
        res.status(200).json({error:false,message:badgeSaved})
    }
}

async function deleteBadge(req,res){
    const id = req.query.id

    const count = await Badge.destroy({
        where:{
            id:id
        }
    })

    if(count !== 1){
        res.status(400).json({error:true,message:'DATA_NO_DELETED'})
    }else{
        res.status(200).json({error:false,message:count})
    }
}

module.exports = {login,logout,getListBadge,getListAccess,updateBadgeAccess,createBadge,deleteBadge,editBadge};

