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
