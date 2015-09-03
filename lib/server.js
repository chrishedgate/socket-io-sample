var express = require('express');
var app = express();
var path = require('path');

app.set('port', process.env.PORT || 5000);
app.set('env', process.env.NODE_ENV || 'development');
app.use(express.static(path.join(path.normalize(__dirname + '/..'), 'public')));

var http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(server, {transports: ['websocket']});
require('./socketio')(io);

exports.start = function(done) {
  server.listen(app.get('port'), function(err) {
    console.log(app.get('env') + " is listening on port " + app.get('port'));
    if (typeof done == 'function') {
      done(err);
    }    
  });
};

exports.stop = function() {
  server.close();
};
