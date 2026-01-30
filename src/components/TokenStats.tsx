"use client";

import { useReadContract } from "wagmi";
import { TOKEN_ABI } from "@/constants/abi";
import { getContractAddress } from "@/constants/contracts";
import { formatUnits } from "viem";
import { TrendingUp, Coins, Activity } from "lucide-react";

export function TokenStats({ chainId }: { chainId?: number }) {
  const contractAddress = chainId ? getContractAddress(chainId) : undefined;

  const { data: totalSupply } = useReadContract({
    address: contractAddress,
    abi: TOKEN_ABI,
    functionName: "totalSupply",
    query: {
      enabled: !!contractAddress,
    },
  });

  const { data: decimals } = useReadContract({
    address: contractAddress,
    abi: TOKEN_ABI,
    functionName: "decimals",
    query: {
      enabled: !!contractAddress,
    },
  });

  const { data: symbol } = useReadContract({
    address: contractAddress,
    abi: TOKEN_ABI,
    functionName: "symbol",
    query: {
      enabled: !!contractAddress,
    },
  });

  const formattedSupply = totalSupply && decimals 
    ? formatUnits(totalSupply, decimals)
    : "0";

  const stats = [
    {
      icon: Coins,
      label: "Total Supply",
      value: `${parseFloat(formattedSupply).toLocaleString()} ${symbol || "QTK"}`,
    },
    {
      icon: TrendingUp,
      label: "Network",
      value: chainId === 1 ? "Ethereum" : "Sepolia",
    },
    {
      icon: Activity,
      label: "Status",
      value: "Active",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative bg-dark-800 border border-dark-600 rounded-lg p-6 overflow-hidden group hover:border-neon-purple/50 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/0 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-start space-x-4">
            <div className="p-3 bg-dark-700 rounded-lg group-hover:bg-dark-600 transition-colors">
              <stat.icon className="w-6 h-6 text-neon-purple" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400 font-medium mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
