const PlayerToken = artifacts.require('PlayerToken')

module.exports = async callback => {
  const svb = await PlayerToken.deployed()
  console.log('Creating requests on contract:', dnd.address)
  const tx = await svb.requestNewPlayerToken(77, "Kelvin Leerdam")
  const tx2 = await svb.requestNewPlayerToken(7777777, "Another Player 1")
  const tx3 = await svb.requestNewRandomPlayerToken(7, "Another Player 2")
  const tx4 = await svb.requestNewRandomPlayerToken(777, "Another Player 3")
  callback(tx.tx)
}
