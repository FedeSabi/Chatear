
const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: { origin: "100.20.92.101" },
});

const messages = [];
const deletedMessages = [];

io.on("connection", (socket) => {
  console.log("se conectó un usuario");

  socket.emit("messages", messages); // Enviar mensajes existentes al nuevo usuario

  socket.broadcast.emit("envio_mensaje", {
    usuario: "INFO",
    mensaje: "Usuario nuevo conectado",
  });

  socket.on("envio_mensaje", (data) => {
    messages.push(data);
    io.emit("envio_mensaje", data);
  });

  socket.on("eliminar_mensaje", (index) => {
    if (messages[index]) {
      const deletedMessage = messages.splice(index, 1)[0];
      deletedMessages.push(deletedMessage);
      io.emit("mensaje_eliminado", index);
    }
  });
});

server.listen(3000);
