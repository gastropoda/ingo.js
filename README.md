# ingo.js

This project is intended for my exploration of angular.js. I have chosen a well-known problem
from UI perspective - an interactive Go board with a game tree navigation controls. There are
many existing apps implementing it and well established conventions and requirements, so I don't
have to think much about the features and UX decisions, only about how to implement it with angular.

To keep it more familiar to me I didn't follow angular's suggested testing setup with jasmine as
a test framework. Instead I use a combination of mocha, sinon and chai.

## The name

in**go** = 隠語, japanese for jar**go**n, ar**go**t

## Try it

```
# install browser dependencies
bower install

# install console dependencies
npm install

# start development server
npm start
```

... then browse to http://localhost:8000/

Serving over http is necessary for loading of the game files with AJAX from "the server".

## Spikes

### 1. proof of concept

Draw the board with some stones and symbols.

Bring together the framework, drawing library and initial understanding of what is necessary

### 2. SGF browser

Load SGF and browse it
