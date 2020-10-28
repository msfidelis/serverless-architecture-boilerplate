FROM node:12.19.0-alpine3.10

RUN npm install -g serverless

WORKDIR /app/

COPY ./package.json /app/package.json

RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["npm", "run", "dev"]