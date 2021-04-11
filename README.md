<<<<<<< HEAD
# SVB Digital dynamic playercard (MH)
<!-- Introduction -->
## Introduction (SH)
*Surinaamse Voetbal Bond (SVB)*  digital dynimac collectable player-card is a project built by a global team of developers participating in the ChainLink Hackathon 2021.
<!-- Vision -->
### **Vision**
Football is the number 1 most popular & dominating sports-community in the world! with as much as *4 billion fans* we have seen the interaction between fans and the sport going from visiting matches physically from the frontlines of the pitch to nowadays following their favourite League/ club/ teams and players *various mediaplatforms*. Supporters and Fans got involved and engaged on a whole other level when *merchandise* made its way into the industry. Fans now got the chance to walk into a fanstore and purchase all the *decoration, sportswear & collectables* available displaying the club, teams or players they are proud of and love the most.

 (with the next thing recently; legally betting systems)
<!-- Mission -->
### **Mission**
This is a golden chance to learn how to develop on a project that gently introduces sports fans seamlessly to blockchain & smart contract environments using Chainlink 
oracles.

Our Mission is developing a exclusive digital dynamic collectable player card for low developed countrys in this case: ''*the proud fans of Suriname*'' that gives acces to 
Exclusive artwork, limited edition
images or behind the scene pictures content from ''*Natio Suriname*''.

This to revolutionize engagement with the National soccer team in a revolutionary way.

(Dynamic data on the card as a player evolves.)




### **Solutions**

* Adaption to blockchain & Smartcontract
<!-- Technology -->
* Users Devices/ Technology/ Solutions

Internet and wifi are becoming more popular in Suriname. In many households, hotels, cafes and restaurants in larger towns offer wireless internet, which is very useful if you have your own laptop or smartphone with you. 

Skype with your own laptop or calling via WhatsApp is also possible in many hotels, cafes and restaurants with wireless internet, provided the connection is stable.
 
With prepaid SIM card for mobile phones You will then receive a Surinamese number If you also take an internet bundle, you can use the internet. there is no coverage in remote areas such as Kabalebo, Palumeu (Kasikasima) and Semoisi.
<!-- SVB x opensea -->
* SVB DDPC x OPEN SEA

OpenSea is the first and largest marketplace for user-owned digital goods, which include collectibles, gaming items, domain names, digital art, and other assets backed by a blockchain.

# SVB Player Token Creation

This repo is a starting point for creating:
1. NFTs built with verifiable RNG using the [Chainlink VRF](https://docs.chain.link/docs/get-a-random-number)
2. Create dynamic NFTs that change based on real world data. [By using decentralized oracles to get data.](https://docs.chain.link/docs/make-a-http-get-request)
3. Adding your randomized NFTs to the [OpenSea Marketplace](https://opensea.io/)

Skip down to [deploy To Opensea](#deploy-to-opensea) - to see how to add a tokenURI

We will easily create our own NFT on the Rinkeby Chain. We can edit the name of the player in the [`generate-player.js`](./scripts/generate-player.js) script. 

This will create a player with a random id:
 -   uint256 id;

And with the following user-specified attributes:
 -   uint256 total_goals;
 -   uint256 yellow_cards;
 -   uint256 red_cards;
 -   uint256 total_assists;
 -   uint256 age;
 -   uint256 jersey_number;
 -   string name;
 -   string team_name;
 -   string position;
 -   string preferred_foot;


## Quickstart

Right now this repo only works with rinkeby. Run the following.

### Setup Environment Variables
You'll need a `MNEMONIC` and a rinkeby `RINKEBY_RPC_URL` environment variable. Your `MNEMONIC` is your seed phrase of your wallet. You can find an `RINKEBY_RPC_URL` from node provider services like [Infura](https://infura.io/)

Then, you can create a `.env` file with the following.

```bash
MNEMONIC='cat dog frog....'
RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

Or, set them in a `bash_profile` file or export them directly into your terminal. You can learn more about [environment variables here](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html). 

To run them directly in your terminal, run: 
```bash
export MNEMONIC='cat dog frog....'
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

Then you can get started with:

### Clone The Repo and migrate
```
git clone https://github.com/e-y/svb_dynamic_nft.git
cd nft
git checkout main
npm install
truffle migrate --reset --network rinkeby
```

This will deploy your SVB Player NFT!

### Generate a player
You can now try it out:
```bash
truffle exec scripts/fund-contract.js --network rinkeby
truffle exec scripts/generate-player.js --network rinkeby
truffle exec scripts/get-player.js --network rinkeby
```

This will create a new player with a random id and user-supplied stat values.
Depending how often you deploy, you can pick which player by changing the [`svb.getplayerOverView(1)`](contracts/player.sol) command in `get-player.js` to swap the `0` out with whatever `tokenId` of the player you like. 

This will give you the overview of your NFT. You'll see `BN` since the call returns big numbers, you can cast them to ints to see what they are.... Or you could go one step farther

### See it on etherscan or oneclickdapp

You can get an [Etherscan API key](https://etherscan.io/apis) for free and interact with the NFTs on chain. Then set `ETHERSCAN_API_KEY ` as an environment variable.

```bash
npm install truffle-plugin-verify
truffle run verify player --network rinkeby --license MIT
```

This will verify and publish your contract, and you can go to the `Read Contract` section of etherscan that it gives you. 

Otherwise, you can use [oneclickdapp](https://oneclickdapp.com/) and just add the contract address and ABI. You can find the ABI in the `build/contracts` folder. Just remember it's not the whole file that is the ABI, just the section that says `ABI`.


# Deploy to Opensea

Once we have our NFTs created, we need to give them a `tokenURI`. TokenURIs are the standard for showing the data of NFTs to the world. This makes it easier to store things like images since we don't have to waste the gas of adding them on-chain. 

The [TokenURI](https://eips.ethereum.org/EIPS/eip-721) represents a URL or other unique identifier, and it is an `.json` file with a few parameters.

```
{
    "name": "Name for it ",
    "description": "Anything you want",
    "image": "https://ipfs.io/ipfs/HASH_HERE?file.png",
    "attributes": [...]
}
```

We are going to be storing these images and meta data in IPFS. You'll need both:
1. [IPFS](https://ipfs.io/)
2. [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en)
3. [Pinata](https://pinata.cloud/pinataupload)

IPFS is a peer to peer network for storing files. It's free and open sourced, and we can use it to host our tokenURI. The IPFS companion let's us view IPFS data nativly in our browsers like Brave or Chrome. And Pinata allows us to keep our IPFS files up even when our node is down (don't worry about that for now)

Once our IPFS node is up, we can start adding files to it. We first want to upload the image of our NFT. What does this D&D player look like? Add it to your IPFS node and then "Pin" it. Once pinned, you can get the CID of the pinned file, and make sure it stays pinned by pinning it on your Pinata account. Don't worry, it's free! This will just help keep the data up even when our IPFS node is down. 

Once we have the image pinned and up, we can get the link for that image. It'll look a little something like this:

`https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png`

This is a real link, and if you click it and nothing renders, your IPFS companion might not be working, or your IPFS node is down. 

Once we have our image, we can add it to our metadata `.json` file, and add our stats in there. You can see some samples in the `metadata` folder. We want to use the values of our players that we got off-chain, so be sure to verify what the random numbers you got on etherscan! Once we have the .json metadata file, we want to add that to IPFS as well, and pin it too!

This metadata json file is going to be our `tokenURI`, so we will modify our `set-token-uri.js` with the `tokenId` of the NFT we are giving a picture to, and adding the ipfs tokenURI.

Then we just run it like:

```
truffle exec scripts/set-token-uri.js --network rinkeby
```

Now, we can get the address of our NFT and head on over to the opensea testnet marketplace to see if we did it correctly. If done correctly, it'll look [something like this](https://testnets.opensea.io/assets/player-v9).

[Here is the link for adding your testnet NFT contract to be viewed on opensea.](https://testnets.opensea.io/get-listed/step-two)
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> svb_dynamic_nft_website/master
