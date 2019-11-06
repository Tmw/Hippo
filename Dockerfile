ARG ALPINE_VERSION=3.9
##################################################
##							 FRONTEND  BUILDER							##
##################################################
FROM node:10.16.3-alpine AS frontend-builder
WORKDIR /app
ADD ./hippo-frontend /app/
RUN npm install
RUN npm run build

##################################################
##								BACKEND BUILDER								##
##################################################
FROM elixir:1.9.1-alpine AS backend-builder

# we're always building using prod environment
ENV APP_NAME="hippo"
ENV MIX_ENV=prod
WORKDIR /app

# install the tools we need, but no overages
RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache \
  git \
  build-base && \
  mix local.rebar --force && \
  mix local.hex --force

# copy the application resouces
COPY ./hippo-backend .

# then copy the front-end artefacts to the Elixir layer
COPY --from=frontend-builder /app/build/ /app/priv/static/

# install and compile dependencies, then compile our app
RUN mix do deps.get, deps.compile, compile

# make a release
RUN mix release

##################################################
##								 FINAL IMAGE   								##
##################################################

# build the application image
FROM alpine:${ALPINE_VERSION}

RUN apk update && \
  apk add --no-cache \
  bash \
  openssl-dev

ENV APP_NAME="hippo"

# Expose for http traffic
EXPOSE 4000

WORKDIR /opt/app

# copy the artefacts from the builder image into /opt/app
COPY --from=backend-builder /app/_build/prod/rel/${APP_NAME} .
ADD start.sh .

# start command
CMD /opt/app/start.sh
