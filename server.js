import http from "http";
import app from "./app.js";
import { gv } from "./configs/globalVariable.js";
import { connectToDb } from "./configs/db.js";

const server = http.createServer(app);
const PORT = gv.port || 8000;

connectToDb().then(() => {
  server.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
