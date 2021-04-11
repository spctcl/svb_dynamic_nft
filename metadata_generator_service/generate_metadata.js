const imageService = require('../image_generator_service/generate_image');
const ipfsService = require('../ipfs_storage_service/ipfs_storage_service');
const { exec, spawn } = require('child_process');
//const setURI = require('../nft_contracts/scripts/set-token-uri');

const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const { constants } = require('http2');

// The server listens for POST requests with query strings of the following format:
// ?
http.createServer(async function (req, res) {
    if (req.method === 'POST') {
        // TODO: Validate the query string. For testing, and as the service is intended to be run locally, we aren't validating at this time.
        const queryObject = url.parse(req.url, true).query; // TODO: Parse is deprecated. Find a substitute.

        console.log(queryObject);

        res.writeHead(200, { 'Content-Type': 'test/html' });

        const result = await storeOnIPFS(queryObject.filename);

        res.end(result.toString);
    }
}).listen(8082) // Make sure to give each micro-service a unique port number.

// This function takes as argument updated player stats and generates metadata using the following steps:
// 1. Generate a player image with the updated stats.
// 2. Store that image on IPFS, returning the IPFS URI to that image.
// 3. Generate a TokenURI JSON with the new stats and the image URI.
// 4. Store the TokenURI on IPFS.
// 5. Return the TokenURI to the caller.   
async function generateMetadata(attributes) {
    let fileName = 'output_image_12.png';
    imageService.generateImage(fileName, async function (result) {
        const hasResult = typeof result !== 'undefined';
        console.log("Image generated successfully: " + hasResult);

        const storeOnIPFS = ipfsService.storeOnIPFS;
        const storeURI = ipfsService.storeURI;

        const ipfsResult = await storeOnIPFS(fileName);
        console.log("IPFS Result" + ipfsResult);

        // Generate the TokenURI.
        const imageURI = buildImageURI(ipfsResult, fileName);
        const tokenURI = buildTokenURIFile(imageURI, 3, 4, 5, 5);
        console.log(tokenURI);
        await fs.writeFile("../assets/tokenURI.json", JSON.stringify(tokenURI))
            .then(async () => {
                const tokenURI = await storeURI("tokenURI.json");
                console.log("IPFS URI result: " + tokenURI);
                const tokenURIPath = "https://ipfs.io/ipfs/" + tokenURI.cid + "?filename=" + tokenURI.path
                const tokenIpfsURI = "ipfs://" + tokenURI.cid;
                console.log(tokenIpfsURI.toString());
                
                // Call truffle set token URI script from command line.
                //exec('truffle exec ../nft_contracts/scripts/set-token-uri.js', (error, stdout, stderr) => {
                var truffleExec = exec('truffle exec', ['scripts/set-token-uri.js', '--network rinkeby'],
                    // {
                    //    cwd: "/Users/erik/developer_projects/svb_dynamic_nft/nft_contracts",
                    //    shell: true
                    // }, 
                    (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log("completed");
                    console.log(`stdout: ${stdout}`);
                });

                truffleExec.stderr.on('data', function(data) {
                   console.log(data); 
                });

                // Call setURI with callback.
                // const updateResult = await setURI(tokenURI, function (tx) {
                //     console.log(`transaction: ${tx}`);
                // });
            })
            .catch( (err) => {
                console.log("Error writing file: " + err);
            });
    });
}

function buildImageURI(ipfsResult, fileName) {
    const cid = ipfsResult.cid;
    return "https://ipfs.io/ipfs/" + cid.toString() + "?filename=" + fileName;
}

function buildTokenURIFile(imageURI, goalVal, assistVal, yellowVal, redVal) {
    const json = {
        "name": "Ryan Donk",
        "description": "Ryan Donk's NFT",
        "image": imageURI,
        "traits": [
            {
                "trait_type": "goals",
                "value": goalVal,
                "max_value": 100
            },
            {
                "trait_type": "assists",
                "value": assistVal,
                "max_value": 100
            },
            {
                "trait_type": "yellow-cards",
                "value": yellowVal,
                "max_value": 100
            },
            {
                "trait_type": "red-cards",
                "value": redVal,
                "max_value": 100
            }
        ]
    }
    return json
}

generateMetadata()