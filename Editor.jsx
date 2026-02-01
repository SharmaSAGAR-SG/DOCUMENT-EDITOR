import { useEffect, useState } from "react";
import socket from "../services/socket";
import { getDocument, saveDocument } from "../services/api";

function Editor() {
  const [text, setText] = useState("");

  useEffect(() => {
    getDocument().then(res => setText(res.data.content));

    socket.on("receive-changes", data => {
      setText(data);
    });
  }, []);

  const handleChange = e => {
    setText(e.target.value);
    socket.emit("send-changes", e.target.value);
    saveDocument(e.target.value);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

export default Editor;
