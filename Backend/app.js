const express = require('express')
const app = express()
const cors = require('cors')
const config  = require('./config')
const apiRoute = require('./routes/apiRoute')
//const dotEnv = require('dotenv').config()


app.use(express.json());
app.use(cors(config.corsOptions))
app.use('/api', apiRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT} ...`));