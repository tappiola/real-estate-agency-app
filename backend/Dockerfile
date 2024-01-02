FROM node

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

# Helper script for waiting until DB is ready when we run container
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh ./
RUN chmod +x ./wait-for-it.sh

EXPOSE 5000

CMD ["npm", "start"]
