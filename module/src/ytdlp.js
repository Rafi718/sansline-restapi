const youtubedl = require('youtube-dl-exec')

youtubedl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
  dumpSingleJson: true,
  noCheckCertificates: true,
}).then(output => console.log(output))