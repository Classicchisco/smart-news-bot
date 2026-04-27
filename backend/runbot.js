const { fetchCryptoNews } = require("./services/news");
const { getBitcoinPrice } = require("./services/crypto");
const { fetchEthereumWhales } = require("./services/whaleAlerts");
const { analyzeMarket } = require("./services/ai");
const { postTweet } = require("./services/twitter");
const { sendTelegramMessage } = require("./services/telegram");

async function runBot() {
  console.log("\n🚀 RUNBOT EXECUTING...\n");

  try {
    // 📊 DATA COLLECTION
    const btcPrice = await getBitcoinPrice();
    const news = await fetchCryptoNews();
    const whales = await fetchEthereumWhales();

    // 🧠 ANALYSIS
    const analysis = analyzeMarket(news, whales);

    // 📊 BUILD REPORT
    const report = `
🚀 Crypto Intelligence Report

💰 BTC: $${btcPrice}

🐋 Whale Activity: ${whales.length} large tx

📊 Sentiment:
Bullish: ${analysis.bullish}
Bearish: ${analysis.bearish}

🎯 SIGNAL: ${analysis.signal}

⚡ Whale Impact: ${analysis.whalePower}
`;

    console.log(report);

    // 🧠 STORE FOR DASHBOARD (FIXED PROPERLY INSIDE FUNCTION)
    global.lastBTC = btcPrice;
    global.lastWhales = whales;
    global.lastSignal = analysis.signal;

    // 🐦 SOCIAL + ALERTS
    await postTweet(report);
    await sendTelegramMessage(report);

  } catch (err) {
    console.error("Runbot error:", err.message);
  }
}

module.exports = { runBot };