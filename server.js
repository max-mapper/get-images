var http = require('http')
var getImages = require('./')
var url = require('url')

http.createServer(handler).listen(80)

function handler(req, res) {
  var instructions = {
    usage: "?url=http://somewebpage.com",
    sourceCode: "https://github.com/maxogden/get-images"
  }
  var query = url.parse(req.url, true).query
  var isIE = req.headers['user-agent'].match(/MSIE/)
  if (query.url) return generateImagePage(query.url, res, isIE)
  else return res.end(JSON.stringify(instructions))
}

function generateImagePage(pageURL, res, isIE) {
  getImages(pageURL, function(err, images) {
    if (err) return res.end(err)
    res.setHeader('content-type', 'text/html')
    if(isIE) res.write('<!doctype html>\n') //stupid IE quirks mode requirement
    images.map(function(imgURL) {
      if(isIE && /svg$/i.test(imgURL)){
        res.write('<object data="' + imgURL + '" style="max-width: 100%" type="image/svg+xml"></object>\n')
      }else{
        res.write('<img style="max-width: 100%" src="' + imgURL + '">\n')
      }
    })
    res.end()
  })
}
