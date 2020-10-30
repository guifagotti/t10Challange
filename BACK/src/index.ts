require('dotenv').config()

import * as path from 'path';
import express from 'express'
import helmet from 'helmet'


const app = express();
const fs = require('fs')
const cors = require('cors')
const https = require("https")
const PORT = process.env.PORT || 443;
const bodyParser = require('body-parser');
const pool = require('./serverFunctions/poolFactory');
const query = require('./serverFunctions/sqlQueryManager');
const connectionMiddleware = require('./serverFunctions/sqlConMiddleware');

app.use(cors());
app.use(helmet());
app.use(connectionMiddleware(pool));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const options = {
  key: fs.readFileSync(path.join(__dirname, './certs/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/cert.pem')),
};

app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', "https://t10challenge.fulltech.online");
  res.header('Access-Control-Allow-Headers', "*");
  res.statusMessage = "TESTE";
  res.status(500).json({ error: err.toString() });

});


var currentTableData: userData[]

pool.getConnection((err, connection) => {
  try {
    query.getData(connection, function (err, response: serverResponse) {
      if (err)
        console.log(err)
      else
        currentTableData = response.data
    });
    if (err)
      console.log(err)

    connection.release()
  } catch (error) {
    console.log(error)
  }

})


app.get('/api/getData', (req: any, res: any) => {

  query.getData(req.connection, function (err, response: serverResponse) {
    if (err) {
      res.json(err)
    }
    else {
      currentTableData = response.data
      res.json(response)
    }
  })
})


app.post('/api/updateData', async (req, res, next) => {

  let newData: userData = {
    id: 0,
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Participation: parseInt(req.body.Participation)
  }

  query.consistencyCheck(newData, currentTableData, function (err, response: serverResponse) {
    if (err) {
      res.statusMessage = err.data
      res.status(400).send();
    }
    else {
      query.updateData(req.connection, newData, function (err, response: serverResponse) {
        if (err) {
          res.json(err)
        }
        else {
          query.getData(req.connection, function (err, response: serverResponse) {
            if (err) {
              res.json(err)
            }
            else {
              currentTableData = response.data
              res.json(response.data)
            }
          })
        }
      })
    }
  });
})

app.get('/api/resetData', (req: any, res: any) => {

  query.resetData(req.connection, function (err, response: serverResponse) {
    if (err) {
      res.json(err)
    }
    else {
      response.data = []
      res.json(response)
    }
  })
})

https.createServer(options, app).listen(PORT, () => console.log(`T10 Challenge server live `));