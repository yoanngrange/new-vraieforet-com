import "./env.js";
import { renderFiles } from "./render.js";
import { files } from "./config.js";
import express from "express";

renderFiles(files).then(() => console.log("done"));

const app = express();
app.use(express.static("dist"));

app.get("/rebuild", function (req, res) {
  renderFiles(files).then(() => res.send("done"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`i'm up!`);
});
