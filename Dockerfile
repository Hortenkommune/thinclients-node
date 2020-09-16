FROM docker.io/library/node:14
WORKDIR /usr/src/app

RUN npm install --production
EXPOSE 3000
CMD [ "npm", "start" ]