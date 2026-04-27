async function postTweet(message) {
  try {
    // TEMP MODE (safe)
    console.log("\n🐦 TWEET POSTED:\n");
    console.log(message);

    // If you later add real API, this is where it goes

    return true;

  } catch (err) {
    console.error("Twitter error:", err.message);
  }
}

module.exports = { postTweet };