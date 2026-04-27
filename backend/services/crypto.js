const axios = require("axios");

let cachedPrice = null;
let lastFetch = 0;

async function getBitcoinPrice() {
  const now = Date.now();

  if (cachedPrice && now - lastFetch < 60000) {
    return cachedPrice;
  }

  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    cachedPrice = res.data.bitcoin.usd;
    lastFetch = now;

    return cachedPrice;

  } catch (err) {
    console.error("CoinGecko error:", err.message);
    return cachedPrice;
  }
}

module.exports = { getBitcoinPrice };