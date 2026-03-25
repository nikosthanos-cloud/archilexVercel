# Single-stage build: keeps all deps available for migrations (drizzle-kit) and runtime
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDeps for drizzle-kit, tsx, vite, etc.)
RUN npm ci

# Copy source code
COPY . .

# Build the project (React frontend → dist/public, server → dist/index.cjs)
RUN npm run build

# Expose the port
EXPOSE 5000

# Set production environment
ENV NODE_ENV=production

# Run migrations then start server
CMD ["sh", "-c", "npm run db:push && npm start"]
