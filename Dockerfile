FROM node:17.4.0-alpine
COPY package*.json ./
ENV NODE_ENV='production'
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]