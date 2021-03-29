const PlayerGenerator = artifacts.require('PlayerTokenGenerator')
const TOKENID = 0
module.exports = async callback => {
    try {
        const generator = await PlayerGenerator.deployed()
        console.log('Let\'s set the tokenURI of your players')
        const tx = await generator.setTokenURI(0, "https://ipfs.io/ipfs/QmYrLfjyxrAMmc668j8wGy3qUcZEszLzrDdA1RccTywg8V?filename=kelvin-leerdam.json")
        const tx1 = await generator.setTokenURI(1, "https://ipfs.io/ipfs/QmTvsVaaHTuMNmwXgbfgkrztFEazAPyzmrb4VSS2PbqLjA?filename=another_player_1.json")
        const tx2 = await generator.setTokenURI(2, "https://ipfs.io/ipfs/QmPZQhiBB6pwcxRgwZe2mx6ZizCPYgq8i4FBMETyWK1V2z?filename=another_player_2.json")
        const tx3 = await generator.setTokenURI(3, "https://ipfs.io/ipfs/QmS6aznzxshLMcECPQZjCR94UF22WHu6FMM5HLQvaYL9NP?filename=another_player_3.json")
        console.log(tx)
        callback(tx.tx)
    } catch {
        callback(err)
    }
}