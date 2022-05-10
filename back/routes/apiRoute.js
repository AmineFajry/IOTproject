const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')


const userController = require('../controllers/userController');
const iotController = require('../controllers/iotController');
const microcController = require('../controllers/microcController');

const {checkAuth} = require("../middlewares/auth");

router.post('/login',cors(config.corsOptions),userController.login);
router.post('/logout',cors(config.corsOptions),checkAuth,userController.logout);

router.get('/user/listbadge',cors(config.corsOptions),checkAuth,userController.getListBadge);
router.get('/user/listaccess',cors(config.corsOptions),checkAuth,userController.getListAccess);
router.put('/user/bagde/update/access',cors(config.corsOptions),checkAuth,userController.updateBadgeAccess);

router.post('/user/badge',cors(config.corsOptions),checkAuth,userController.createBadge);
router.delete('/user/badge',cors(config.corsOptions),checkAuth,userController.deleteBadge);
router.put('/user/badge',cors(config.corsOptions),checkAuth,userController.editBadge);

router.get('/iot/brightness',cors(config.corsOptions),iotController.getBrightness)
router.get('/iot/access',cors(config.corsOptions),iotController.badgeAccess)

router.get('/user/listobject',checkAuth,cors(config.corsOptions),microcController.getMicroc);
router.post('/user/listobject',checkAuth,cors(config.corsOptions),microcController.createMicroc);
router.delete('/user/listobject',checkAuth,cors(config.corsOptions),microcController.deleteMicroc);
router.put('/user/update/lightsensor',checkAuth,cors(config.corsOptions),microcController.updateLightSensor);

module.exports = router;