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
const requireMap = new RequireMap('app.js', {
    filename: 'filename.html',  // default 'requiremap.html'
    radius: 14, // Node radius, default 14
    lineLength: 120 // Node connection length, default 120
})
requireMap.run()

```

If successful, there will be a file called `requiremap.html` in your root directory.

open in your browers:

![requiremap.html](https://raw.githubusercontent.com/sad-xu/require-map/master/img/example.png)

## Update Recode (ง •_•)ง

- [x] Fix path error bug
- [x] Comments are ignored
- [ ] Add more options
- [ ] Can parse `import` 
- [ ] Optimize web


## License

MIT &copy; [Xu Haocong](https://github.com/sad-xu)