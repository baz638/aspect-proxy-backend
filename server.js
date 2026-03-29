const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Aspect Proxy Running");
});

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("No URL provided");

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.send("Error fetching URL");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running on port " + PORT));
