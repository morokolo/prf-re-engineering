import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/public", express.static("public")); // Serve static files
app.use("/api", router); // Use the router

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
