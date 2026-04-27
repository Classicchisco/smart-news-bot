function analyzeMarket(news, whales, btcHistory = []) {
  let bullish = 0;
  let bearish = 0;

  const bullWords = ["surge", "rise", "gain", "bull", "up", "record", "high"];
  const bearWords = ["drop", "fall", "crash", "loss", "down", "low"];

  // 📰 NEWS SENTIMENT (weighted better)
  news.forEach(n => {
    const t = n.title.toLowerCase();

    if (bullWords.some(w => t.includes(w))) bullish += 1;
    if (bearWords.some(w => t.includes(w))) bearish += 1;
  });

  // 🐋 WHALE IMPACT (weighted by size, not just count)
  const whalePower = whales.reduce((sum, w) => {
    return sum + Number(w.valueETH || 0);
  }, 0);

  if (whalePower > 300) bullish += 2;
  if (whalePower < 100) bearish += 1;

  // 📊 BTC MOMENTUM (optional improvement)
  if (btcHistory.length >= 2) {
    const latest = btcHistory[btcHistory.length - 1];
    const prev = btcHistory[btcHistory.length - 2];

    if (latest > prev) bullish += 1;
    if (latest < prev) bearish += 1;
  }

  // 🎯 FINAL SIGNAL (now more strict)
  let signal = "HOLD";

  if (bullish >= bearish + 2) signal = "BUY 📈";
  else if (bearish >= bullish + 2) signal = "SELL 📉";

  return {
    signal,
    bullish,
    bearish,
    whalePower
  };
}

module.exports = { analyzeMarket };