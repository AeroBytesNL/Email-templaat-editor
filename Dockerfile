FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml turbo.json ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

WORKDIR /app/apps/web

ENV NODE_ENV production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

CMD ["pnpm", "start"]