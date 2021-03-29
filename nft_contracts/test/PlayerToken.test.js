
const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers')

const RANDOM_SEED = 100
const PLAYER_NAME = "Kelvin Leerdam"

contract('PlayerToken', accounts => {
    const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
    const PlayerToken = artifacts.require('PlayerToken.sol')
    const defaultAccount = accounts[0]

    let link, svg

    beforeEach(async () => {
        link = await LinkToken.new({ from: defaultAccount })
        player = await PlayerToken.new({ from: defaultAccount })
    })

    describe('#requestNewRandomPlayer', () => {
        context('without LINK', () => {
            it('reverts', async () => {
                const newPlayer = await expectRevert.unspecified(svb.requestNewRandomPlayer(RANDOM_SEED, PLAYER_NAME))
            })
        })
    })
})  