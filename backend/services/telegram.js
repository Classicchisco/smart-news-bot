const axios = require("axios");

async function sendTelegramMessage(message) {
  try {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML"
    });

  } catch (err) {
    console.error("Telegram error:", err.message);
  }
}

module.exports = { sendTelegramMessage };