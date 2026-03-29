const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Aspect Proxy Running");
});

app.get("/proxy", async (req, res) => {
  let url = req.query.url;
  if (!url) return res.send("No URL");

  try {
    const response = await fetch(url);
    let body = await response.text();

    // 🔥 rewrite links so they stay inside proxy
    body = body.replace(/href="\/(.*?)"/g, `href="/proxy?url=${url}/$1"`);
    body = body.replace(/href="(https?:\/\/.*?)"/g, `href="/proxy?url=$1"`);

    res.send(body);
  } catch (err) {
    res.send("Error loading site");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("running"));
