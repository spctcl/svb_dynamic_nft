const http = require('http');
const url = require('url');
const IPFS = require('ipfs-core');
const uint8ArrayConcat = require('uint8arrays/concat');
const fs = require('fs');
const { notEqual } = require('assert');

// We're using the IPFS Regular Files API here.
// The functions storeOnIPFS and storeURI differ in that the former stops
// the node to avoid a locked file error, while the latter does not.
// These functions are an obvious choice for refactoring.
async function storeOnIPFS(fileName) {
  const node = await IPFS.create()
  const version = await node.version()

  console.log('Version', version.version)

  // try {
  // const fileAdded = await node.add({
  //     path: 'output_image_3.png',
  //     content: 'output image 3'
  //   })

  const file = fs.readFileSync('../assets/' + fileName);

  // We could also use addAll here, which returns an async iterable, if dealing with a batch of images.
  const result = await node.add({
    path: fileName,
    content: file
  })

  node.stop()

  // NOTE: The code below is for testing. It is ommented to disable writing of large file contents to stdout.
  // Read the previously written file from IPFS. 
  // const chunks = []
  // try {
  //   for await (const chunk of node.cat(result.cid)) {
  //     chunks.push(chunk)
  //   }
  //   console.log('added file contents:', uint8ArrayConcat(chunks).toString())
  // } catch (error) {
  //   console.error(error);
  // }

  // This is an alternative file writing method that accepts a path.
  //await node.files.write('/output_image_3.png', image, {create: true})
  //console.log('added file:', fileAdded.path, fileAdded.cid);

  return result
}

async function storeURI(fileName) {
  const node = await IPFS.create()
  const version = await node.version()

  console.log('Version', version.version)

  const file = fs.readFileSync('../assets/' + fileName);

  const result = await node.add({
    path: fileName,
    content: file
  })
  console.log("ipfs result cid: " + result.cid);
  return result
}

module.exports.storeOnIPFS = storeOnIPFS;
module.exports.storeURI = storeURI;
