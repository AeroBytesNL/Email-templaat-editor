FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm build

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["pnpm", "start"]