
function onDisconnect(socket) {
  console.log('[%s] DISCONNECTED', socket.address);
}

function onConnect(socket) {
  console.log('[%s] CONNECTED (device=%s)', socket.address, socket.device);
}

module.exports = function (io) {
  io.use(function(socket, next) {
    var device = socket.handshake.query.device;

    if (device) {
      socket.device = device;
      return next();
    }
    next(new Error('Device information missing'));
  });

  io.on('connection', function (socket) {
    socket.address = socket.handshake.address;
    socket.connectedAt = new Date();

    socket.on('helo', function(data) {
      console.log('[%s] helo: %s', new Date(), JSON.stringify(data));
      socket.emit('eloh', data);
    });

    socket.on('disconnect', function () {
      onDisconnect(socket);
    });

    onConnect(socket);
  });
}
