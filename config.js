var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



//middlewares--> procesan los datos antes de...
app.use(express.static(__dirname+"/public"));



// aqui escuchamos las peticiones que hacen los clientes a nuestro servicio por el puente socket
io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado');
    console.log(socket);
    
});





//aqui arrancamos el servidor
server.listen(8080, function() {
	console.log('Servidor corriendo en http://localhost:8080');
});