# Require-Map

[![Build Status](https://travis-ci.org/sad-xu/require-map.svg?branch=master)](https://travis-ci.org/sad-xu/require-map) 

> Show the require contact map for your nodejs project.

## Install
```
$ npm install --save @pihachu/require-map
```

## Usage
```js
const RequireMap = require('@pihachu/require-map')

// (entry file, options)
const requireMap = new RequireMap('app.js')
requireMap.run()

// will add some options in next version...
```

If successful, there will be a file called `requiremap.html` in your root directory.

open in your browers:

![requiremap.html](https://raw.githubusercontent.com/sad-xu/require-map/master/img/example.png)

## Update Recode (ง •_•)ง

- [x] Fix path error bug
- [x] Comments are ignored

## License

MIT © [Michael Wuergler](http://numetriclabs.com)
