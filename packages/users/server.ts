import "reflect-metadata";
import "dotenv/config";
import "./database";
import app from "./app";

app.listen(3000, () => {
  console.log("Server Running");
});
