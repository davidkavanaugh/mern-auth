FROM node:14 as base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base as stage
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "node", "index.js" ]