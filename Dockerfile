FROM debian:buster

RUN apt-get -qq update \
  && DEBIAN_FRONTEND=noninteractive \
  apt-get -y install --no-install-recommends \
    ca-certificates \
  && apt-get clean

RUN echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
    | tee -a /etc/apt/sources.list.d/caddy-fury.list

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y update \
    && apt-get -y install \
      --no-install-recommends \
      bash \
      caddy \
      cron \
      curl \
      fcgiwrap \
      file \
      gettext \
      git \
      grep \
      htop \
      jq \
      less \
      net-tools \
      osmium-tool \
      procps \
      unzip \
      util-linux \
      uuid-runtime \
      vim \
      wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y update \
    && apt-get -y install \
      --no-install-recommends \
      nodejs \
      npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

RUN mkdir -p /osm
COPY ./package.json /openindoor-app/package.json
COPY ./.eslintrc.js /openindoor-app/.eslintrc.js
COPY ./babel.config.js /openindoor-app/babel.config.js
COPY ./tsconfig.json /openindoor-app/tsconfig.json
COPY ./package.json /openindoor-app/package.json

WORKDIR /openindoor-app

RUN yarn install

COPY ./src /openindoor-app/src
COPY ./public /openindoor-app/public
COPY ./tests /openindoor-app/tests

RUN yarn build
RUN mkdir -p /data/www  
RUN mv ./dist/* /data/www/

COPY ./Caddyfile /etc/caddy/Caddyfile

# CMD yarn serve --port 3000
CMD (caddy fmt /etc/caddy/Caddyfile & caddy run --watch --config /etc/caddy/Caddyfile)
