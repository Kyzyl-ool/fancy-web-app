FROM node:18 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx nx run fancy-backend:build:production

EXPOSE 3000

ENTRYPOINT ["node"]

