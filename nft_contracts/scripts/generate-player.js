const PlayerGenerator = artifacts.require('PlayerTokenGenerator')

module.exports = async callback => {
  const generator = await PlayerGenerator.deployed()
  console.log('Creating requests on contract:', generator.address)

  // The player token generator takes a number as a random seed and a player name.
  // const tx = await generator.requestNewRandomPlayerToken(875423, "Ryan Donk")
  // const tx2 = await generator.requestNewRandomPlayerToken(7777777, "Another Player 1")
  // const tx3 = await generator.requestNewRandomPlayerToken(7, "Another Player 2")
  // const tx4 = await generator.requestNewRandomPlayerToken(777, "Another Player 3")
  const tx = await generator.requestNewRandomPlayerToken(875423, "Ryan Donk")
  callback(tx.tx)
}