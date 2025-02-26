# Stage 1: Install dependencies and build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml turbo.json ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build --filter=./apps/web...

# Stage 2: Run the application
FROM node:20-alpine AS runner
WORKDIR /app/apps/web
ENV NODE_ENV production
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --production
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ || exit 1
CMD ["pnpm", "start"]