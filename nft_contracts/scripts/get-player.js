const PlayerGenerator = artifacts.require('PlayerTokenGenerator')

module.exports = async callback => {
    try {
        const generator = await PlayerGenerator.deployed()
        console.log('Let\'s get the overview of the player.')
        const overview = await generator.players(16)
        console.log(overview)
        callback(overview.tx)
    } catch (err) {
        callback(err)
    }
}
