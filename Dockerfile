FROM node:23.3.0-alpine3.19

WORKDIR /micro-blog-backend

COPY package*.json /

RUN npm install

COPY . .

ENV PORT=4500

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]