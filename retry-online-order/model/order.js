const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  name:  String,
  onlineOrder: Boolean
}, { timestamps: true, versionKey: false })

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel