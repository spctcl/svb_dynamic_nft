const SVBPlayerToken = artifacts.require('SVBPlayerToken')

module.exports = async callback => {
    const svb = await SVBPlayerToken.deployed()
    console.log('Let\'s get the overview of the player.')
    const overview = await svb.players(0)
    console.log(overview)
    callback(overview.tx)
}
