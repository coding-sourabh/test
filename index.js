const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

async function start() {

  let colors = [];

  const jsonString = fs.readFileSync("./maskColor.json");
  const maskColor = JSON.parse(jsonString);

  for (const [key, value] of Object.entries(maskColor)) {
    colors.push(value);
  }

  let image = await loadImage("./testImages/99cb301e-2246-41f7-80a0-c0aa7362b6cfss.png");
  let srcImage = await loadImage("./testImages/99cb301e-2246-41f7-80a0-c0aa7362b6cf.png");

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
  let imgData = ctx.getImageData(0, 0, image.width, image.height);

  ctx.drawImage(srcImage, 0, 0);
  let srcImgData = ctx.getImageData(0, 0, srcImage.width, srcImage.height);

  for (let i = 0; i < imgData.data.length; i += 4) {
    let r = imgData.data[i], g = imgData.data[i + 1], b = imgData.data[i + 2];
    let hexColor = rgbToHex(r, g, b);

    if (colors.includes(hexColor)) {
      srcImgData.data[i] = r;
      srcImgData.data[i + 1] = g;
      srcImgData.data[i + 2] = b;
    }
  }

  ctx.putImageData(srcImgData, 0, 0);

  let buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("./creations/creation8.png", buffer);
}

start()

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function RGBToHex(r = 0, g = 0, b = 0) {
  // clamp and convert to hex
  let hr = Math.max(0, Math.min(255, Math.round(r))).toString(16);
  let hg = Math.max(0, Math.min(255, Math.round(g))).toString(16);
  let hb = Math.max(0, Math.min(255, Math.round(b))).toString(16);
  return (
    "#" +
    (hr.length < 2 ? "0" : "") +
    hr +
    (hg.length < 2 ? "0" : "") +
    hg +
    (hb.length < 2 ? "0" : "") +
    hb
  );
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



const express = require('express')
const app = express()

app.listen(8080, () => {
  console.log('listening at 8080 !');
})

app.get('/', (req, res) => {
  res.send('<h1> HEllO PM2 </h1>')
})