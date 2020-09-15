FROM docker.io/library/node:14
RUN git clone --depth 1 https://github.com/Hortenkommune/thinclients-node.git /usr/src/app --single-branch --branch master
WORKDIR /usr/src/app
COPY .env .
RUN npm install --production
EXPOSE 3000
CMD [ "npm", "start" ]