const PlayerTokenGenerator = artifacts.require('PlayerToken')

module.exports = async callback => {
  const generator = await PlayerTokenGenerator.deployed()
  console.log('Creating requests on contract:', generator.address)

  // The player token generator takes a number as a random seed and a player name.
  const tx = await generator.requestNewRandomPlayerToken(875424, "Kelvin Leerdam")
  const tx2 = await generator.requestNewRandomPlayerToken(7777777, "Another Player 1")
  const tx3 = await generator.requestNewRandomPlayerToken(7, "Another Player 2")
  const tx4 = await generator.requestNewRandomPlayerToken(777, "Another Player 3")
  callback(tx.tx)
}