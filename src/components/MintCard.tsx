"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TOKEN_ABI } from "@/constants/abi";
import { getContractAddress } from "@/constants/contracts";
import { formatUnits, parseUnits } from "viem";
import { Wallet, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export function MintCard() {
  const { address, isConnected, chain } = useAccount();
  const [amount, setAmount] = useState("1");
  const [txStatus, setTxStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const contractAddress = chain?.id ? getContractAddress(chain.id) : undefined;

  // Read user's token balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
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

  // Write contract hook for minting
  const { writeContract, data: hash, error: writeError, isPending: isWritePending } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Handle transaction status
  useEffect(() => {
    if (isWritePending || isConfirming) {
      setTxStatus("pending");
    } else if (isConfirmed) {
      setTxStatus("success");
      refetchBalance();
      setTimeout(() => {
        setTxStatus("idle");
        setAmount("1");
      }, 3000);
    } else if (writeError) {
      setTxStatus("error");
      setErrorMessage(writeError.message);
      setTimeout(() => {
        setTxStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  }, [isWritePending, isConfirming, isConfirmed, writeError, refetchBalance]);

  const handleMint = () => {
    if (!contractAddress || !decimals) return;

    try {
      const mintAmount = parseUnits(amount, decimals);
      writeContract({
        address: contractAddress,
        abi: TOKEN_ABI,
        functionName: "mint",
        args: [mintAmount],
      });
    } catch (error) {
      setTxStatus("error");
      setErrorMessage("Invalid amount");
      setTimeout(() => {
        setTxStatus("idle");
        setErrorMessage("");
      }, 3000);
    }
  };

  const formattedBalance = balance && decimals 
    ? formatUnits(balance, decimals)
    : "0";

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="border-gradient rounded-2xl p-8 text-center bg-dark-800/50 backdrop-blur-sm">
        <Wallet className="w-16 h-16 mx-auto mb-4 text-neon-purple opacity-50" />
        <h3 className="text-2xl font-display font-bold mb-2">Connect Your Wallet</h3>
        <p className="text-slate-400">
          Connect your wallet to view your balance and mint tokens
        </p>
      </div>
    );
  }

  return (
    <div className="border-gradient rounded-2xl p-8 bg-dark-800/50 backdrop-blur-sm glow-box relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-transparent to-neon-cyan animate-float" />
      </div>

      <div className="relative z-10">
        {/* User Info */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-dark-600">
          <div>
            <p className="text-sm text-slate-400 mb-1">Connected Wallet</p>
            <p className="font-mono text-neon-purple font-medium">
              {truncateAddress(address)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 mb-1">Your Balance</p>
            <p className="text-2xl font-bold text-white">
              {parseFloat(formattedBalance).toLocaleString()} <span className="text-neon-cyan text-lg">{symbol || "QTK"}</span>
            </p>
          </div>
        </div>

        {/* Mint Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Amount to Mint
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              disabled={txStatus === "pending"}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter amount"
            />
          </div>

          <button
            onClick={handleMint}
            disabled={!amount || parseFloat(amount) <= 0 || txStatus === "pending"}
            className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 btn-hover flex items-center justify-center space-x-2 group"
          >
            {txStatus === "pending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : txStatus === "success" ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Success!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                <span>Mint Tokens</span>
              </>
            )}
          </button>

          {/* Status Messages */}
          {txStatus === "success" && (
            <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <p className="text-sm text-green-400">
                Transaction confirmed! Your tokens have been minted.
              </p>
            </div>
          )}

          {txStatus === "error" && (
            <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">
                {errorMessage || "Transaction failed. Please try again."}
              </p>
            </div>
          )}

          {txStatus === "pending" && hash && (
            <div className="flex items-center space-x-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin flex-shrink-0" />
              <div className="text-sm text-blue-400">
                <p className="font-medium mb-1">Transaction pending...</p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-cyan hover:underline font-mono text-xs"
                >
                  View on Etherscan
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
