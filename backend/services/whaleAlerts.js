function fetchEthereumWhales() {
  const whaleCount = Math.random() > 0.5 ? 1 : 2;

  return Array.from({ length: whaleCount }).map(() => {
    const value = (Math.random() * 500 + 50).toFixed(2);

    return {
      from: "0x" + Math.random().toString(16).slice(2, 10),
      to: "0x" + Math.random().toString(16).slice(2, 10),
      valueETH: Number(value)
    };
  });
}

module.exports = { fetchEthereumWhales };