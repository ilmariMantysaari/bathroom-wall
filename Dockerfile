# the js is built in separate container to reduce the size of the final image
FROM node:7 AS build

WORKDIR /opt/app
#TODO: find a better solution for environment configuration
ENV REACT_APP_SOCKET_URL ws://vessanseina.mntsr.com:3000/socket

COPY frontend frontend
WORKDIR /opt/app/frontend
RUN yarn install && yarn build && \
    cp -r /opt/app/frontend/build /opt/app/build && \
    rm -rf frontend

WORKDIR /opt/app
COPY backend/package.json \
     backend/yarn.lock \
     backend/index.js \
     backend/tsconfig.json ./
RUN yarn install --pure-lockfile && rm -rf /root/.yarn-cache
COPY backend/src ./src

FROM node:7 AS run

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /opt/app
COPY --from=build /opt/app ./
CMD service nginx start && node index.js