const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socket = io("http://localhost:32321");
const client = feathers();
client.configure(socketio(socket));
client.configure(auth());

module.exports = client;