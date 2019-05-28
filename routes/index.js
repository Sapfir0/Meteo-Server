const express = require('express');
const app = express.Router();

const bodyParser = require('body-parser');
const path = require('path')
const viewsDir = path.join(__dirname, "..", "views/")


app.get('/', (req, res, next) =>  {
  res.sendFile(viewsDir + "index.html")
});

app.post('/', (req,res,next) => {
  console.log(req.body)
  res.send(req.body)
})


module.exports = app;
