const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')


const userController = require('../controllers/userController');
const {checkAuth} = require("../middlewares/auth");

router.post('/login',cors(config.corsOptions),userController.login);
router.post('/logout',cors(config.corsOptions),checkAuth,userController.logout);

router.get('/user/listbadge',cors(config.corsOptions),checkAuth,userController.getListBadge);
router.get('/user/listaccess',cors(config.corsOptions),checkAuth,userController.getListAccess);
router.put('/user/bagde/update/access',cors(config.corsOptions),checkAuth,userController.updateBadgeAccess);


module.exports = router;