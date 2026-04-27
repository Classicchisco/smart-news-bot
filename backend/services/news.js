const axios = require("axios");

async function fetchCryptoNews() {
  try {
    const res = await axios.get(
      "https://www.reddit.com/r/cryptocurrency/top.json?limit=5",
      {
        timeout: 5000 // ⏱️ prevent hanging requests
      }
    );

    const posts = res.data?.data?.children || [];

    if (!posts.length) throw new Error("No news data");

    return posts.map(p => ({
      title: p.data.title
    }));

  } catch (err) {
    console.error("News error:", err.message);

    // 🔥 FALLBACK NEWS (so your bot NEVER breaks)
    return [
      { title: "Crypto market showing mixed signals today" },
      { title: "Bitcoin traders watching key resistance levels" },
      { title: "Ethereum activity remains steady" }
    ];
  }
}

module.exports = { fetchCryptoNews };