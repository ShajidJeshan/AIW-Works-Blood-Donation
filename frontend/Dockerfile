FROM node:15.13-alpine

WORKDIR /frontend

COPY package.json .

ENV PATH="./node_modules/.bin:$PATH"

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]