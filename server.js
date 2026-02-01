const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

require("./db");
const Document = require("./models/Document");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  socket.on("send-changes", data => {
    socket.broadcast.emit("receive-changes", data);
  });
});

app.get("/document", async (req, res) => {
  let doc = await Document.findOne();
  if (!doc) doc = await Document.create({});
  res.json(doc);
});

app.post("/document", async (req, res) => {
  const { content } = req.body;
  let doc = await Document.findOne();
  doc.content = content;
  await doc.save();
  res.json({ message: "Saved" });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
