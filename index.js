import "./env.js";

import { files } from "./config.js";
import { renderFiles } from "./render.js";

renderFiles(files).then(() => console.log("done"));
