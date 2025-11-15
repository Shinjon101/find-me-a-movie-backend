# -------------------------
# Stage 1: Build TypeScript
# -------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy everything
COPY . .

# Build TS -> JS in /dist
RUN npm run build


# -------------------------
# Stage 2: Production Image
# -------------------------
FROM node:22-alpine

WORKDIR /app

# Copy only build output + package files
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/server.js"]
