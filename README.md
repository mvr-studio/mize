# Mize: Lambda-esque functions

This tiny server allows you to create function handlers that will act like Next.js API routes - without Next.js.

Routing is file system based, so all you have to do is to create a new file for a route in `/src/api`.

## Installation

```sh
$ npx create-mize-app app-name
```

## Usage

Development server:

```sh
$ yarn dev
```

Build dist version:

```sh
$ yarn build
```

Start dist version server:

```sh
$ yarn start
```

## Features

### Routing

Routing is file system based. Thanks to [jesseditson/fs-router](https://github.com/jesseditson/fs-router#usage).

### Security

Secure your API easily by setting the `MIZE_API_KEY` environmental variable.
Then send your requests with `Authorization` header like: `Mize [MIZE_API_KEY]`.

## Deployment

### Dockerfile

Run locally:

```sh
$ docker build -t mize .
$ docker run -p 3000:3000 mize
```

### Heroku and Herokuish

The repo contains `Procfile`, so you're good to deploy it to Heroku.
