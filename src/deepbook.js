export async function getMarketData() {
  try {
    const response = await fetch(
      "https://deepbook-indexer.mainnet.mystenlabs.com/get_pools"
    );
    const pools = await response.json();
    
    return {
      success: true,
      pools: pools.slice(0, 5),
      message: "Live DeepBook market data"
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Could not fetch market data: " + error.message
    };
  }
}