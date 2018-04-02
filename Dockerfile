FROM node:7

#TODO: multistage image

RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /opt/app
#TODO: find a better solution for environment configuration
ENV REACT_APP_SOCKET_URL ws://vessanseina.mntsr.com:3000/socket

#frontend build
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

CMD service nginx start && node index.js