const express = require('express');
const helmet = require("helmet");
const cors = require('cors')
// const morgan = require('morgan');
// const path = require('path')
// const rfs = require('rotating-file-stream') // version 2.x
require('dotenv').config();
const routesV1 = require('./routes/route.v1');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// create a rotating write stream
// var accessLogStream = rfs.createStream('access.log', {
//   interval: '1d', // rotate daily
//   path: path.join(__dirname, 'log')
// });

// setup the logger
// app.use(morgan('combined', { stream: accessLogStream }));

/* app.use('/patients', routes.makes);
app.use('/users', routes.users); */
routesV1(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
