# This Dockerfile is loosely based on the example given in:
# https://hexdocs.pm/distillery/guides/working_with_docker.html

# the erlang VM likes it when the kernels match; we're using the same alpine version
# for the resulting image as was used inside the elixir image.
ARG ALPINE_VERSION=3.9
FROM elixir:1.9.1-alpine AS builder

# we're always building using prod environment
ENV APP_NAME="hippo"
ENV MIX_ENV=prod
WORKDIR /opt/app

# install the tools we need, but no overages
RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache \
  git \
  build-base && \
  mix local.rebar --force && \
  mix local.hex --force

# copy the application resouces
COPY . .

# install and compile dependencies, then compile our app
RUN mix do deps.get, deps.compile, compile

# make a release
RUN mix release

##########################################
# runnable application image starts here #
##########################################

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
COPY --from=builder /opt/app/_build/prod/rel/${APP_NAME} .

# start command
CMD trap 'exit' INT; /opt/app/bin/${APP_NAME} start
