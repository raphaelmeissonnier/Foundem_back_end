FROM node:16-alpine

WORKDIR /app

COPY . .

WORKDIR /app/perdupn_back_end

RUN npm install

EXPOSE 8081

CMD [ "npm", "start" ]