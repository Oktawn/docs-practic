FROM node
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
CMD ["sh", "-c", "npm run dev"]