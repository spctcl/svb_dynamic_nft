const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const util = require("util");

exports.generateImage = (outputImageName, callback) => {

    // Background-Image (Player)
    const image_base = fs.readFileSync('../assets/svb_card_frontside_2.jpg');
    const image_base__base64 = new Buffer.from(image_base).toString('base64');
    const image_base__dataURI = 'data:image/jpeg;base64,' + image_base__base64

    // Team-Logo (SVB)
    const image_svbLogo = fs.readFileSync('../assets/logo.png');
    const image_svbLogo__base64 = new Buffer.from(image_svbLogo).toString('base64');
    const image_svbLogo__dataURI = 'data:image/jpeg;base64,' + image_svbLogo__base64

    const font_eot = fs.readFileSync('../assets/fonts/icomoon.eot');
    const base64font = new Buffer.from(font_eot).toString('base64');
    const fontURI = 'data:font/truetype;base64,' + base64font
    const file = '';

    function readModuleFile(output, path, callback) {
      try {
          var filename = require.resolve(path);
          output = fs.readFile(filename, 'utf8', callback);
      } catch (error) {
          callback(error);
      }
    }

    // const htmlAsString = readModuleFile(file, './index.html', function (err, htmlAsString) {
    //   console.log("Inside this callback it works:")
    //   console.log(htmlAsString);
    // });


    // console.log("Global Data Outside:")
    // console.log("I cannot store the data inside a variable to be used afterwards within nodeHtmlToImage")
    // console.log(htmlAsString)

      nodeHtmlToImage({
       // output: '../assets/output_image_11.png',
        output: '../assets/' + outputImageName,
        html: '<html><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="preconnect" href="https://fonts.gstatic.com"> <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&family=Comfortaa&family=Frijole&family=Goldman:wght@400;700&display=swap" rel="stylesheet"> <style>/* Included google web fonts: font-family: "Big Shoulders Stencil Text", cursive; font-family: "Frijole", cursive; font-family: "Goldman", cursive; font-family: "Comfortaa", cursive; */ /* Colors used: white=#ffffff white-yellowish=#fffcf3e0 lighter-green=#68e66b badge-green=#119e5a darkish-green=#005f49 */ body{margin: 0;}.card{color: white; font-family: "Comfortaa", cursive; height: 2592px; width: 1728px;}.card__container{margin: auto; width: 100%;}.card__image{height: auto; width: 100%;}/* This is a layer on top of the image to display additional/dynamic data */ .card__top-layer{font-family: "Big Shoulders Stencil Text", cursive; font-size: 4em; height: 100%; left: 0; position: absolute; top: 0; width: 100%; z-index: 1;}.card__title{color: white; display: inline; font-size: 2.5em; left: 50%; margin-block-start: 0px; margin-block-end: 0px; min-width: 50%; padding: 0 80px; position: absolute; transform: translate(-50%, 0); text-align: center; text-transform: uppercase; white-space: nowrap;}.card__title-text:before, .card__title-text:after{background-color: white; content: ""; height: 25px; position: absolute; top: 50%; width: 55px;}.card__title-text:before{transform: translate(-135%, -90%);}.card__title-text:after{transform: translate(30%, -90%);}.card__title-background{background-color: #68e66b; height: 192px; opacity: .95; position: absolute; transform: translateX(-8%); width: -webkit-fill-available; z-index: -1;}.card__title--sub{left: 50%; position: absolute; transform: translate(-50%, 192px);}.card__title--sub:before, .card__title--sub:after{content: unset;}.card__title-background--sub{background-color: #119e5a; height: 215px; opacity: .85; transform: translate(-50%, 0px);}.card__subtitle{display: block; font-size: 1.5em; width: 100%;}.card__number{bottom: 1em; left: 2em; position: absolute;}.card__svb-logo{height: 305px; position: absolute; top: -54px; z-index: 10;}.card__player-number{font-size: 3.8em; font-weight: bold; left: 50%; position: absolute; transform: translate(-50%, -20%); z-index: 5;}.card__player-role{background-color: white; bottom: 1.5em; color: #a90827; font-family: "Goldman", cursive; font-size: 2.75em; height: 225px; margin-block-start: 0; margin-block-end: 0; opacity: .94; position: absolute; text-transform: uppercase; text-align: center; text-shadow: 4px 7px white; width: 100%;}p.card__timestamp{position: absolute; bottom: 1em; right: 0; text-align: right; transform: translateX(-100%);}.badge{background-color: #68e66b; height: 173.21px; margin: 86.60px 0; position: absolute; width: 300px;}.badge:before, .badge:after{border-left: 150px solid transparent; border-right: 150px solid transparent; content: ""; position: absolute; width: 0;}.badge:before{bottom: 99%; border-bottom: 86.60px solid #68e66b;}.badge:after{border-top: 86.60px solid #68e66b; top: 99%; width: 0;}.badge--team{left: 20px; top: 2px;}.badge--number{right: 20px; top: 2px;}.badge__inner{background-color: white; color: #005f49; top: -86.60px; transform: scale(.9); z-index: 5;}.badge__inner:before{border-bottom: 86.60px solid white;}.badge__inner:after{border-top: 86.60px solid white;}</style></head><body class="card"> <img class="card__image" src="{{baseImage}}"> <div class="card__top-layer"> <div class="card__container"> <h1 class="card__title"> <span class="card__title-background"></span> <span class="card__title-text">Natio Suriname</span> </h1> <h2 class="card__title card__title--sub"> <span class="card__title-background card__title-background--sub"></span> <span class="card__subtitle">Ryan Donk</span> </h2> <div class="badge badge--team"> <div class="badge badge__inner"> <img class="card__svb-logo" src="{{svbLogo}}"> </div></div><div class="badge badge--number"> <div class="badge badge__inner"> <span class="card__player-number">{{playerNumber}}</span> </div></div><p class="card__player-role">{{playerRole}}</p><p class="card__number">#{{cardId}}/{{maxCards}}</p><p class="card__timestamp">Yr.{{cardYear}}</p></div></div></body></html>',
        content: {
          baseImage: image_base__dataURI,
          svbLogo: image_svbLogo__dataURI,
          fontSource: fontURI,
          playerNumber: 15,
          playerName: "Ryan Donk",
          playerRole: "Team-Captain",
          cardId: 1,
          maxCards: 500,
          cardYear: 2021,
        }
      })
      .then((result) => {
        callback(result);
      })  
      .catch((error) => console.log(error));
}

//this.generateImage()

