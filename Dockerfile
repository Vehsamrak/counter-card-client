FROM ubuntu:16.04
MAINTAINER Petr Karmashev <smonkl@bk.ru>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -

RUN apt-get install -y --allow-unauthenticated \
    git \
    mc \
    nginx \
    nodejs

RUN npm install -g @angular/cli

RUN apt-get clean && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

COPY docker/etc /etc

CMD ["bash", "/project/docker/init.sh"]

EXPOSE 80
