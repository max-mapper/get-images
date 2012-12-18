var request = require('request')
var $ = require('cheerio')

module.exports = function(url, cb ) {
  request(url, function(err, resp, body) {
    if (err) return cb(err)
    var imageLinks = getImageLinks(body)
    imageLinks = makeLinksAbsolute(imageLinks, url)
    cb(false, imageLinks)
  })
}

function getImageLinks(body) {
  var html = $.load(body.toString())
  var imageLinks = []
  html('a').map(function(i, link) {
    link = $(link)
    var href = link.attr('href')
    if (href.match(/(png|jpe?g)$/i)) imageLinks.push(href)
  })
  return imageLinks
}

function makeLinksAbsolute(links, baseURL) {
  return links.map(function(link) {
    if (link.match(/^http\:\/\//)) {
      return link
    } else {
      return baseURL + link
    }
  })
}