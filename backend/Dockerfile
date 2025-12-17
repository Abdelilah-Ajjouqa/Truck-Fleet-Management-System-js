FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install

COPY babel.config.cjs ./babel.config.cjs
COPY src ./src

EXPOSE 3002

CMD ["node", "src/server.js"]
