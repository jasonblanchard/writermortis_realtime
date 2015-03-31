Provides realtime updates to Writermortis via socket.io

Getting started
------------
Copy `.env.example` and change settings as necessary:

```
cp .env.example .env
```

Start with Node Foreman:

```
nf start
```

Deployment
----------
Configured to play nicely with Heroku and Redis To Go.

Make sure the `REDISTOGO_URL` environment variable is set.
