FROM node

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run migrate && npm run build && npm run start"]