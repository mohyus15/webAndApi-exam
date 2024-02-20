FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/


RUN npm run install-backend --only=production && npm run install-frontend --only=production && npm install --prefix frontend @babel/plugin-proposal-private-property-in-object

COPY frontend/ frontend/
COPY backend/ backend/

RUN npm run build --prefix frontend

USER node
CMD ["node", "backend/src/server.js"]

EXPOSE 8080
