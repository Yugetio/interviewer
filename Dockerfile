FROM node:12.13

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install

COPY ./api .

EXPOSE 3000

CMD ["npm", "run", "dev"]