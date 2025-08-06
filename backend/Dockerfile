FROM node:22-alpine AS base

WORKDIR /usr/src
EXPOSE 5000

COPY package*.json ./


FROM base AS dev

RUN npm ci

COPY . .
USER node

CMD ["npm", "run", "start"]


FROM base AS prod

ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY . .
USER node

CMD ["node", "src/server.js"]
