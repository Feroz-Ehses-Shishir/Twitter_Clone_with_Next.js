import { Server } from "socket.io";
import messageService from "../../libs/services/messageService";
import messageGetService from "../../libs/services/messageGetService";

export default async function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {

    

    socket.on("send-message", async (obj) => {
      await messageService(obj);
      const data = await messageGetService(obj, "just message");
      io.emit("receive-message", data);
    });

    socket.on("message-seen", async (obj) => {
      // if (obj.type == "first") {
      //   await messageGetService(obj, "first");
      // } else {
      //   await messageGetService(obj, "seen");
      // }
      io.emit("message-seen", {seenBy:obj.from,status:"Yes"});
    });
  });

  res.end();
}
