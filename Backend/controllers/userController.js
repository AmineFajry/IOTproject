const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const MicroController = require('../models/MicroControllerModel')
const Badge = require('../models/BadgeModel')
const User = require('../models/UserModel')

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
    return {email: userSave.email, token,error:false};
}

async function updateToken({userFind, password})
{
    let isValid = await bcrypt.compare(password, userFind.password)
    if(isValid) {
        const token = await jwt.sign({email: userFind.email}, 'secret_key');
        userFind.token = token
        const userSave = await userFind.save()
        return {email: userFind.email, token,error:false};
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

async function getListBadge(req,res){
    const email = req.query.email
    const badges = await User.findAll({
        where:{
            email:email
        },
        include:[
            {
                model:MicroController,
                as:'user_microc'
            }
        ]
    })
    res.status(200).json({error:false,message:badges});
}

async function getListAccess(req,res){

    res.status(200).json({error:false});
}


module.exports = {login,logout};

