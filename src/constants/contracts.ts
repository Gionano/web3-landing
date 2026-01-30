// Contract Addresses
// Replace these with your actual deployed contract addresses

export const CONTRACT_ADDRESSES = {
  // Sepolia Testnet
  11155111: "0x0000000000000000000000000000000000000000", // Replace with your Sepolia contract address
  
  // Ethereum Mainnet
  1: "0x0000000000000000000000000000000000000000", // Replace with your Mainnet contract address
} as const;

// Helper to get contract address for current chain
export const getContractAddress = (chainId: number): `0x${string}` => {
  return (CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] || 
         CONTRACT_ADDRESSES[11155111]) as `0x${string}`;
};
