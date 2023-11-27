import { Server } from "socket.io";
import messageService from "../../libs/services/messageService";

export default async function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;;

  io.on("connection", (socket) => {
    socket.on("send-message", async (obj) => {

      await messageService(obj);

      io.emit("receive-message", obj);
    });
  });

  res.end();
}
