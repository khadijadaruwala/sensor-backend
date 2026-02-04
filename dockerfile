# 1) Base image: small Linux + Node
FROM node:20-alpine

# 2) Create app folder inside container
WORKDIR /app

# 3) Copy package files first (better caching)
COPY package*.json ./

# 4) Install dependencies inside container
RUN npm install

# 5) Copy the rest of your code
COPY . .

# 6) Expose the port your server runs on
EXPOSE 8000

# 7) Start the app
CMD ["npm", "run", "dev"]
