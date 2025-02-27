FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

WORKDIR /app/apps/web

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]