FROM node:lts-buster

LABEL Name=my_store Version=1.0.0

EXPOSE 5000

RUN apt-get update && apt-get install -y --no-install-recommends \
    vim \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /server && chown -R node:node /server

USER node

WORKDIR /server

COPY package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

ENV PATH=/server/node_modules/.bin:$PATH

WORKDIR /server/node_server

CMD ["npm", "run", "start"]

