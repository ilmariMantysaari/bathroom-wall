# bathroom-wall
Paint app that syncs the picture with the server. An experiment with React, Typescript and Websockets, all technologies that I didn't have much experience on at the time of making this.

You can test it here http://vessanseina.mntsr.com/
# Dev setup

    docker-compose up backend_dev frontend_dev

For more optimized build

    docker-compose up prod_build

Prod_build builds the production version of the react app and serves it through nginx.