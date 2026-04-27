require("dotenv").config();

const { runBot } = require("./runbot");

console.log("🚀 Smart Bot Starting...");

let running = false;

setInterval(async () => {
  if (running) return;

  running = true;

  await runBot();

  running = false;

}, 120000);

const express = require("express");
const app = express();

app.get("/status", (req, res) => {
  res.json({
    btc: global.lastBTC || 0,
    whales: global.lastWhales || [],
    signal: global.lastSignal || "HOLD"
  });
});

app.listen(3000, () => console.log("Dashboard running on port 3000"));