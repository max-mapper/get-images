var http = require('http')
var getImages = require('./')
var url = require('url')

http.createServer(handler).listen(80)

function handler(req, res) {
  var query = url.parse(req.url, true).query
  if (query.url) return generateImagePage(query.url, res)
  else return res.end(JSON.stringify({error: "usage: ?url=http://somewebpage.com"}))
}

function generateImagePage(pageURL, res) {
  getImages(pageURL, function(err, images) {
    if (err) return res.end(err)
    res.setHeader('content-type', 'text/html')
    images.map(function(imgURL) {
      res.write('<img style="max-width: 100%" src="' + imgURL + '">\n')
    })
    res.end()
  })
}
