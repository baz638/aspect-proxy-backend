const express = require("express");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");

const app = express();

app.use(express.static("public"));
app.use("/uv/", express.static(uvPath));

app.get("/", (req, res) => {
  res.send("Aspect Proxy Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("running on port " + PORT);
});
