FROM node

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

CMD ["sh", "-c", "npm run start"]