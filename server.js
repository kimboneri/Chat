require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173", // Para desarrollo
  "https://TU_NETLIFY_URL.netlify.app", // Producción en Netlify (actualiza esto)
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Un usuario conectado:", socket.id);

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("mensaje", data); // Reenviar mensaje a todos
  });

  socket.on("disconnect", () => {
    console.log("Un usuario se desconectó");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
