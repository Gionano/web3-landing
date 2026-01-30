# 🚀 ClawdCat - Web3 Token Landing Page

A modern, dark-themed Web3 token landing page built with Next.js 14, TypeScript, Tailwind CSS, Wagmi v2, and RainbowKit.

## ✨ Features

- 🎨 **Modern Dark UI**: Futuristic cyberpunk design with neon accents
- 🔗 **Wallet Connection**: Seamless wallet integration via RainbowKit
- 💰 **Token Balance Display**: Real-time balance tracking from smart contracts
- 🎯 **Mint Functionality**: Easy token minting with transaction status tracking
- 📊 **Live Stats**: Display total supply and token metrics
- ⚡ **Optimized Performance**: Built with Next.js 14 App Router
- 🎭 **Animations**: Smooth transitions and engaging micro-interactions
- 📱 **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3 Integration**:
  - Wagmi v2
  - Viem
  - RainbowKit
  - TanStack Query
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn or pnpm
- MetaMask or another Web3 wallet

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) and add it to `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### 3. Configure Your Smart Contract

#### Update Contract Address

Edit `src/constants/contracts.ts` and replace the placeholder addresses with your deployed contract addresses:

```typescript
export const CONTRACT_ADDRESSES = {
  // Sepolia Testnet
  11155111: "0xYourSepoliaContractAddress",
  
  // Ethereum Mainnet
  1: "0xYourMainnetContractAddress",
} as const;
```

#### Update Contract ABI

Edit `src/constants/abi.ts` and replace the placeholder ABI with your actual contract ABI. Make sure your contract includes these functions:

- `mint(uint256 amount)` - For minting tokens
- `balanceOf(address account)` - For checking balance
- `totalSupply()` - For total supply
- `decimals()` - For token decimals
- `symbol()` - For token symbol

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
web3-token-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Web3Provider
│   │   ├── page.tsx             # Main landing page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── Web3Provider.tsx     # Wagmi & RainbowKit provider
│   │   ├── Navbar.tsx           # Navigation with ConnectButton
│   │   ├── TokenStats.tsx       # Token statistics display
│   │   └── MintCard.tsx         # Mint functionality component
│   ├── config/
│   │   └── wagmi.ts             # Wagmi configuration
│   └── constants/
│       ├── abi.ts               # Contract ABI
│       └── contracts.ts         # Contract addresses
├── public/                      # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Change Color Theme

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  neon: {
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#06b6d4",
  },
  // Add your custom colors
}
```

### Modify Fonts

The project uses:
- **Display Font**: Orbitron (headers, logo)
- **Body Font**: Rajdhani (body text)

To change fonts, update the Google Fonts import in `src/app/globals.css`.

### Update Branding

Replace "ClawdCat" with your token name in:
- `src/app/layout.tsx` (metadata)
- `src/components/Navbar.tsx` (logo)
- `src/app/page.tsx` (hero section)

## 🔐 Smart Contract Requirements

Your ERC-20 token contract should implement these functions:

```solidity
function mint(uint256 amount) external;
function balanceOf(address account) external view returns (uint256);
function totalSupply() external view returns (uint256);
function decimals() external view returns (uint8);
function symbol() external view returns (string memory);
```

## 🌐 Supported Networks

- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)

To add more networks, edit `src/config/wagmi.ts`:

```typescript
import { arbitrum, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  // ...
  chains: [mainnet, sepolia, arbitrum, polygon],
});
```

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- AWS
- DigitalOcean
- etc.

## 🔧 Troubleshooting

### Wallet Connection Issues

- Make sure you have a valid WalletConnect Project ID
- Check that your wallet is connected to the correct network
- Clear browser cache and try again

### Transaction Failures

- Ensure you have enough ETH for gas fees
- Verify the contract address is correct
- Check that the contract function names match the ABI

### Build Errors

- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (should be 18.x or later)

## 📄 License

MIT License - feel free to use this project for your own tokens!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js 14, Wagmi v2, and RainbowKit
