const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const pushToRabbit = require('./utils/pushToRabbit')
const orderModel = require('./model/order')
const saveOrderTodb = require('./utils/saveOrderTodb')
const app = express()
const server = require('http').Server(app) 
const socketIO = require('socket.io')


const apps = server.listen(2000, () => {
  console.log('Running at at localhost:2000')
})
let io = socketIO.listen(apps)

mongoose.connect('mongodb://admin:secure@localhost:2277/oms-dev?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json())
app.use(bodyParser.json({limit: '500mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '500mb', parameterLimit: '100000000000000', extended: true}))

app.post('/create-order', (req, res) => {
  const aa = req.body;
  aa.map(async (val) => {
    // setTimeout(() => {
      await pushToRabbit(val)
    // },3000)
  })
  res.send({ status: "create success"})
})

app.get('/call-courier', (req, res) => {
  pushToRabbit()
  res.send('An alligator approaches!');
});

app.get('/retry-call-courier', (req, res) => {
  res.send('An alligator approaches!');
});


//subscribe
saveOrderTodb()