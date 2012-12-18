# get-images

scrape a page and get an array of all the `<a>` links to pngs or jpegs

## Installation

```
npm install get-images
```

## Usage

```javascript
var getImages = require('get-images')
getImages('http://substack.net/images', function(err, images) {
  // => images is an array of image urls like ["http://substack.net/images/1up.png"]
})
```

## Bonus feature

there is a built in proxy server (`server.js`) that you should run with `sudo server.js` and then `open http://localhost/?url=http://substack.net/images/`

## License

BSD