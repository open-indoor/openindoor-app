FROM debian:buster

RUN apt-get -qq update \
  && DEBIAN_FRONTEND=noninteractive \
  apt-get -y install --no-install-recommends \
    ca-certificates \
  && apt-get clean

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

RUN mkdir -p /osm
COPY ./requirements.txt /osm/
RUN pip3 install -v -r /osm/requirements.txt

COPY ./Caddyfile /etc/caddy/Caddyfile

WORKDIR /usr/bin
COPY ./action.py /usr/bin/action
COPY ./tic.sh /usr/bin/tic
COPY ./osm-api.sh /osm/osm-api.sh
RUN chmod +x /osm/osm-api.sh

CMD /osm/osm-api.sh

EXPOSE 80
