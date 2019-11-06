# Hippo

Lane based task management

# Front-end

## Dunning dev server

```bash
cd hippo-frontend && npm start
```

## Extracting updated Fragment / Union types

In order for Apollo to resolve Fragments and Unions into their concrete types, it needs a little guidance from our back-end schema. Writing updates of the schema to disk can be done by running:

```bash
npm run get_fragment_types
```

The extracted fragment_types will be written to `src/graphql/fragmentTypes.json`

# Back-end

```bash
cd hippo-backend
mix deps.get
iex -S mix phx.server
```

# Running with Docker

by far the easiest way to toy with this little project is by running with Docker. Either by building from scratch (including its Postgres dependency) or running the pre-baked Docker image from Docker hub.

## Build and run Docker from source using Docker Compose

```bash
  git clone git@github.com:Tmw/Hippo.git
  cd hippo
  docker-compose up
```

## from Dockerhub

```bash
docker run \
  -e DB_HOST=localhost \
  -e DB_USER=hippo \
  -e DB_PASS=hippo \
  -e DB_NAME=hippo \
  hippo_hippo-app
```

_Note_ this approach expects you to setup and link a Postgresql database yourself as configured in the environment variables. The docker container will run its migrations against the provided database on startup.
