import { SuiClient } from "@mysten/sui/client";
import { DeepBookClient } from "@mysten/deepbook-v3";

const suiClient = new SuiClient({ 
  url: "https://fullnode.mainnet.sui.io:443"
});

export async function getMarketData() {
  try {
    const deepbook = new DeepBookClient({
      client: suiClient,
      env: "mainnet"
    });

    const pools = await deepbook.getAllPools();
    
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