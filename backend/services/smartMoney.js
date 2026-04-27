const walletTracker = {};

function trackSmartMoney(whales) {
  whales.forEach(w => {
    if (!walletTracker[w.from]) {
      walletTracker[w.from] = 1;
    } else {
      walletTracker[w.from] += 1;
    }
  });

  // cap growth so it doesn't explode
  const smartWallets = Object.entries(walletTracker)
    .filter(([_, count]) => count >= 2 && count <= 5)
    .map(([wallet, count]) => ({ wallet, count }));

  return smartWallets;
}

module.exports = { trackSmartMoney };