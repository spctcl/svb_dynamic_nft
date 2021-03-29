const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');

const image = fs.readFileSync('./svb_card_frontside_1.jpg');
const base64Image = new Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image

nodeHtmlToImage({
  output: './output_image_2.png',
  html: '<html><head><style>body {width: 1750px; height: 2600px;}</style></head><body>><img src="{{imageSource}}" width="1750" height="2600"/></body></html>',
  content: { imageSource: dataURI }
})