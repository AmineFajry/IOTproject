const express = require('express')
const app = express()
const cors = require('cors')
const config  = require('./config')
const apiRoute = require('./routes/apiRoute')
const sequelize = require("./db.js")
const MicroController = require('./models/MicroControllerModel')
const Badge = require('./models/BadgeModel')
const User = require('./models/UserModel')
const Historic = require('./models/HistoricModel')

app.use(express.json());
app.use(cors(config.corsOptions))
app.use('/api', apiRoute);

try {
    sequelize.authenticate();

   MicroController.hasMany(Historic);
   Badge.hasMany(Historic);

    User.hasMany(MicroController,{foreignKey: 'user_id', as:'user_microc'});
    User.hasMany(Badge,{foreignKey: 'user_id', as:'user_badge'});

    sequelize.sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));