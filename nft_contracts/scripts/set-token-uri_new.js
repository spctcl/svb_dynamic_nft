let privateKey = ''

const truffle = require('truffle');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ee0b2c8435c54ef5a497628feb28f076"))

var contract = require("@truffle/contract");
var data = require("../build/contracts/PlayerTokenGenerator.json");
var PlayerGenerator = contract(data);

var provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ee0b2c8435c54ef5a497628feb28f076");
PlayerGenerator.setProvider(provider);

const TOKENID = 0

module.exports = async (tokenURI, callback) => {
    try {
        console.log("attempting to instantiate generator from deployed contract.");
        const generator = await PlayerGenerator.deployed()

        let accounts = await web3.eth.getAccounts()
            .then( (account) => 
                {
                    let account0 = account[0];
                    console.log("account0:" + account0);
                });

        console.log("accounts: " + accounts);
        
        //console.log(generator);
        console.log('Let\'s set the tokenURI of your players')
        console.log(`tokenURI: ${tokenURI}`);

    // let accounts = await web3.eth.getAccounts()
    // const realAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

        //const account = web3.eth.accounts.wallet[0].address
        // web3.eth.accounts.wallet.add(privateKey)
        // const account = web3.eth.accounts.wallet[0].address
        // web3.eth.account
        // console.log(account);
        // console.log("tokenURI: " + tokenURI.toString());
        // We meed an account.

       // let accounts = await Web3.eth.getAccounts()
        //const account = provider.accounts[0];
        //console.log(`accounts: ${account}`);


        // Send a signed raw transaction: eth_sendRawTransaction
        // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        //     .on('receipt', console.log);
     
        //const tx = await generator.setTokenURI(0, tokenURIPath, {from: account})
        const tx = await generator.setTokenURI(0, 'https://ipfs.io/ipfs/QmNmYLXfLWvwFSRWMDCV21h3x36t5A6kkbE7p1WaHtzADx?filename=tokenURI.json')
        // const tx1 = await generator.setTokenURI(1, "https://ipfs.io/ipfs/QmTvsVaaHTuMNmwXgbfgkrztFEazAPyzmrb4VSS2PbqLjA?filename=another_player_1.json")
        // const tx2 = await generator.setTokenURI(2, "https://ipfs.io/ipfs/QmPZQhiBB6pwcxRgwZe2mx6ZizCPYgq8i4FBMETyWK1V2z?filename=another_player_2.json")
        // const tx3 = await generator.setTokenURI(3, "https://ipfs.io/ipfs/QmS6aznzxshLMcECPQZjCR94UF22WHu6FMM5HLQvaYL9NP?filename=another_player_3.json")
        console.log(tx)
        callback(tx.tx)
    } catch (err) {
        callback(err)
    }
}
