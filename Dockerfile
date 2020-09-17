FROM docker.io/library/node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]