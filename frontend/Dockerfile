FROM node:22 AS deps

WORKDIR /usr/src

COPY package*.json ./

RUN npm ci

COPY . .


FROM deps AS dev

EXPOSE 3000

CMD ["npm", "start"]


FROM deps AS build

RUN npm run build


FROM nginx AS prod

COPY --from=build /usr/src/build/ /usr/share/nginx/html

COPY --from=build /usr/src/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
