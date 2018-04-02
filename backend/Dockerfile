FROM node:7

COPY package.json yarn.lock /usr/app/
WORKDIR /usr/app
RUN yarn install --pure-lockfile && chmod -R ugo+r node_modules && rm -rf /root/.yarn-cache
COPY index.js tsconfig.json /usr/app/
COPY src /usr/app/src

CMD ["node", "index.js"]
