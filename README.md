# Require-Map

> Show the require contact map for your nodejs project.

## Install
```
$ npm install --save @pihachu/require-map
```

## Usage
```js
const RequireMap = require('@pihachu/require-map')

const requireMap = new RequireMap('app.js') // your entry file
requireMap.run()

// will add some options in next version...
```

If successful, there will be a file called `requiremap.html` in your root directory.

open in your browers:

![requiremap.html](https://raw.githubusercontent.com/sad-xu/require-map/master/img/example.png)


## License

MIT © [Michael Wuergler](http://numetriclabs.com)
