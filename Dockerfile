# Use the official Node.js image with Alpine variant
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files to the working directory
COPY package*.json ./

RUN npm install 

COPY . .


EXPOSE 8080

CMD ["node", "server.js"]
