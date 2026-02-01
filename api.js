import axios from "axios";

export const getDocument = () =>
  axios.get("http://localhost:5000/document");

export const saveDocument = content =>
  axios.post("http://localhost:5000/document", { content });
