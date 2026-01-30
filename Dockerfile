# Dockerfile

# ---- Stage 1: Builder ----
# Tahap ini menginstall dependensi dan membangun aplikasi Next.js
FROM node:20-alpine AS builder
LABEL author="Gemini"
LABEL stage="builder"

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi menggunakan 'npm ci' yang lebih cepat dan aman untuk CI/CD
RUN npm ci

# Salin sisa kode aplikasi
COPY . .

# Bangun aplikasi Next.js untuk produksi
RUN npm run build

# ---- Stage 2: Runner ----
# Tahap ini mengambil hasil build dari tahap sebelumnya dan menjalankannya
FROM node:20-alpine AS runner
LABEL stage="runner"

WORKDIR /app

# Buat pengguna non-root untuk keamanan
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Salin server hasil build 'standalone'
COPY --from=builder /app/.next/standalone ./
# Salin ASET STATIS (CSS, JS, gambar) yang diperlukan oleh server
COPY --from=builder /app/.next/static ./.next/static
# Salin folder public untuk file statis
COPY --from=builder /app/public ./public

# Berikan kepemilikan kepada pengguna non-root
RUN chown -R nextjs:nodejs .

# Ganti ke pengguna non-root
USER nextjs

# Expose port yang digunakan oleh Next.js (default 3000)
EXPOSE 3000

# Set environment variable untuk port
ENV PORT 3000

# Perintah untuk menjalankan aplikasi
# 'server.js' adalah file yang dibuat oleh output 'standalone'
CMD ["node", "server.js"]
