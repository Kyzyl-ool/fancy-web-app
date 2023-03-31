FROM node:18 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx nx run fancy-web-app:build:production

FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/dist/fancy-web-app ./fancy-web-app
COPY --from=builder /app/dist/memoizer ./memoizer
COPY --from=builder /app/dist/react-ui-utils ./react-ui-utils
COPY --from=builder /app/dist/smart-suggests ./smart-suggests
COPY --from=builder /app/dist/ui-kit ./ui-kit

RUN rm /etc/nginx/conf.d/*.conf

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
