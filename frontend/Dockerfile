FROM node:7
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile && chmod -R ugo+r node_modules && rm -rf /root/.yarn-cache
COPY tsconfig.json tslint.json ./
COPY src src
COPY public public

CMD ["yarn", "start"]
