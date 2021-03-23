const SVBPlayerToken = artifacts.require('PlayerToken')
const TOKENID = 0
module.exports = async callback => {
    const player = await PlayerToken.deployed()
    console.log('Let\'s set the tokenURI of your players')
    const tx = await dn.setTokenURI(0, "https://ipfs.io/ipfs/QmYrLfjyxrAMmc668j8wGy3qUcZEszLzrDdA1RccTywg8V?filename=kelvin-leerdam.json")
    // const tx1 = await player.setTokenURI(1, "https://ipfs.io/ipfs/QmTvsVaaHTuMNmwXgbfgkrztFEazAPyzmrb4VSS2PbqLjA?filename=some_player_2.json")
    // const tx2 = await player.setTokenURI(2, "https://ipfs.io/ipfs/QmPZQhiBB6pwcxRgwZe2mx6ZizCPYgq8i4FBMETyWK1V2z?filename=some_player_3.json")
    // const tx3 = await player.setTokenURI(3, "https://ipfs.io/ipfs/QmS6aznzxshLMcECPQZjCR94UF22WHu6FMM5HLQvaYL9NP?filename=some_player_4.json")
    console.log(tx)
    callback(tx.tx)
}
