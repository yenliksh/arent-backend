FROM node:16-alpine3.14 AS builder
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine3.14 AS runner
WORKDIR /app
COPY --from=builder /app ./
RUN apk add bash
ENTRYPOINT ["sh", "-c"]
EXPOSE 5000
CMD ["node -r ./tsconfig-paths-bootstrap.js dist/src/main.js"]