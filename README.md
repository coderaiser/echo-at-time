# Echo At Time [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[BuildStatusURL]:           https://travis-ci.org/coderaiser/echo-at-time "Build Status"
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/echo-at-time.svg?style=flat-squere&longCache=true

`/echoAtTime` - receives two parameters, time and message, and writes that message to the server console at the given time.

## Install

```
npm i
```

## Usage

Start server:

```
REDIS_URL=redis://localhost:6379 PORT=3000 npm start
```

Send time in ISO format (`new Date().toISOString()`) and message in `json` format:

```
curl localhost:3000/echoAtTime -X POST -d '{"time": "2019-09-04T20:07:33.455Z", "messag: "hello worlds"}'
```

## Decisions

 - A couple messages can be passed with the same time, so time field always modified with a suffix of a form `time^i`, where `i` is a counter.

- To represent `time` and `message` data `Hashes` redis data type was chosen, because of usage conviniance and
[speed](https://matt.sh/introduction-to-redis-data-types).

- To write the message at the given time `setTimeout` used with a subtraction result between given and current time. This solution [isn't perfect](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified), but it is the best we can achive using built-in `JavaScript` functions.

