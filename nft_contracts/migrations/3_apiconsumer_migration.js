const APIConsumer = artifacts.require('APIConsumer')

module.exports = async (deployer, network, [defaultAccount]) => {
  // hard coded for rinkeby
  if (network.startsWith('rinkeby')) {
    await deployer.deploy(APIConsumer)
    let apiConsumer = await APIConsumer.deployed()
  } else if (network.startsWith('mainnet')) {
    console.log("If you're interested in early access to Chainlink VRF on mainnet, please email vrf@chain.link")
  } else {
    console.log("Right now only rinkeby works! Please change your network to Rinkeby")
  }
}