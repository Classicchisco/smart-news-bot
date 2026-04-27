require("dotenv").config();

const express = require("express");
const { runBot } = require("./runbot");

const app = express();

// ✅ BASIC ROUTE (so browser shows something)
app.get("/", (req, res) => {
  res.send("🚀 Smart News Bot is running...");
});

// ✅ STATUS ROUTE (for your dashboard / testing)
app.get("/status", (req, res) => {
  res.json({
    btc: global.lastBTC || null,
    whales: global.lastWhales || [],
    signal: global.lastSignal || "N/A"
  });
});

// ✅ IMPORTANT: USE RENDER PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Dashboard running on port ${PORT}`);
});

// ✅ RUN BOT EVERY 60 SECONDS
setInterval(async () => {
  await runBot();
}, 60000);

// ✅ RUN IMMEDIATELY ON START
runBot();