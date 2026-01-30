/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // BAGIAN 1: Solusi Home Lab (Agar bisa diakses IP lain tanpa Error 3000)
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '192.168.100.12:3000', // GANTI dengan IP Server Home Lab Anda
        'my-server.local:3000' // Opsional jika pakai hostname
      ],
    },
  },

  // BAGIAN 2: Konfigurasi Webpack (Gabungan Web3 + Home Lab Watcher)
  webpack: (config) => {
    // A. Konfigurasi Web3 (Dari kode Anda)
    // Menangani error modul node.js yang hilang di browser
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Mencegah error library pino/lokijs yang sering dipakai library crypto
    config.externals.push("pino-pretty", "lokijs", "encoding");
    
    // Fix untuk RainbowKit/Wagmi agar tidak mencari storage React Native
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": false,
    };

    // B. Tambahan untuk Home Lab (Docker/VM)
    // Memastikan Hot Reload (HMR) jalan lancar meski diakses dari network lain
    config.watchOptions = {
      poll: 1000,       // Cek perubahan file setiap 1 detik
      aggregateTimeout: 300,
    };

    return config;
  },
};

export default nextConfig;