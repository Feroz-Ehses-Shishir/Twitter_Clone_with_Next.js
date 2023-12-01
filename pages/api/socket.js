import { Server } from "socket.io";
import messageService from "../../libs/services/messageService";
import messageGetService from "../../libs/services/messageGetService";

export default async function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.join(socket.handshake.query.roomID);

      //   // Join a room
      // socket.join('room1');

      // // Handle disconnection
      // socket.on('disconnect', () => {
      //   console.log('User disconnected');

      //   // Disconnect the socket from the room when the user disconnects
      //   socket.leave('room1');
      // });

      socket.on("send-message", async (obj) => {
        await messageService(obj);
        const data = await messageGetService(obj, "just message");
        io.to(socket.handshake.query.roomID).emit("receive-message", data);
      });

      socket.on("message-seen-server", async (obj) => {
        if (obj.type == "first") {
          console.log("first");
          await messageGetService(obj, "first");
        } else {
          await messageGetService(obj, "seen");
        }

        const data = await messageGetService(obj, "just message");

        io.to(socket.handshake.query.roomID).emit("message-seen", data);
      });
    });
  }
  res.end();
}
