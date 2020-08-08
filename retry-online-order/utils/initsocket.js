const socketIO = require('socket.io')

const io = socketIO.listen(app)

module.exports = io