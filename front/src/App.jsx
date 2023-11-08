
import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { LiMensaje, UlMensajes } from "./ui-components";
const socket = io("http://localhost:3000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [messages, setMessages] = useState([]);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [userName, setUserName] = useState(""); // Nombre de usuario único

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      // Generar un nombre de usuario único
      setUserName(`Usuario-${socket.id}`);
    });

    socket.on("envio_mensaje", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on("mensaje_eliminado", (index) => {
      // Eliminar el mensaje de la lista de mensajes
      setMessages((messages) => messages.filter((_, i) => i !== index));
    });

    return () => {
      socket.off("connect");
      socket.off("envio_mensaje");
      socket.off("mensaje_eliminado");
    };
  }, []);

  const enviarMensaje = () => {
    socket.emit("envio_mensaje", {
      usuario: userName, // Utiliza el nombre de usuario único
      mensaje: nuevoMensaje,
    });
  };

  const eliminarMensaje = (index) => {
    socket.emit("eliminar_mensaje", index); // Emitir evento para eliminar el mensaje
  };

  return (
    <div className="container">
      <h1 className="titulo">Chatear</h1>
      <h2 className="estado">{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
      <p className="usuario-conectado">Usuario: {userName}</p>
      <UlMensajes>
        {messages.map((message, index) => (
          <LiMensaje key={index}>
            {message.usuario}: {message.mensaje}
            <button onClick={() => eliminarMensaje(index)} className="btnEliminar">
              Eliminar
            </button>
          </LiMensaje>
        ))}
      </UlMensajes>

      <ul className="mensajes-eliminados">
        {deletedMessages.map((message, index) => (
          <LiMensaje key={index}>
            {message.usuario}: {message.mensaje} (Eliminado)
          </LiMensaje>
        ))}
      </ul>

      <input type="text" onChange={(e) => setNuevoMensaje(e.target.value)} />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default App;
