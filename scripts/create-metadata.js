const PlayerGenerator = artifacts.require('PlayerTokenGenerator')
const fs = require('fs')

const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [// TODO: Complete attributes.
        {
            "trait_type": "Jersey Number",
            "value": ""
        },
        {
            "trait_type": "Total Goals",
            "value": 0
        },
        {
            "trait_type": "Total Assists",
            "value": 0
        },
        {
            "trait_type": "Yellow Cards",
            "value": 0
        },
        {
            "trait_type": "Red Cards",
            "value": 0
        }
    ]
}
module.exports = async callback => {
    try {
        const generator = await PlayerGenerator.deployed()
        length = await generator.getNumberOfPlayers()
        index = 0
        while (index < length) {
            console.log('Let\'s get the overview of your player ' + index + ' of ' + length)
            let playerMetadata = metadataTemple
            let playerOverview = await generator.players(index)
            index++
            playerMetadata['name'] = playerOverview['name']
            if (fs.existsSync('metadata/' + playerMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
                console.log('test')
                continue
            }
            console.log(playerMetadata['name'])
            // playerMetadata['attributes'][0]['value'] = playerOverview['jersey_number']['words'][0]
            // playerMetadata['attributes'][1]['value'] = playerOverview['total_goals']['words'][0]
            // playerMetadata['attributes'][2]['value'] = playerOverview['total_assists']['words'][0]
            // playerMetadata['attributes'][3]['value'] = playerOverview['yellow_cards']['words'][0]
            // playerMetadata['attributes'][4]['value'] = playerOverview['red_cards']['words'][0]
            filename = 'metadata/' + playerMetadata['name'].toLowerCase().replace(/\s/g, '-')
            let data = JSON.stringify(playerMetadata)
            fs.writeFileSync(filename + '.json', data)
        }
        callback(generator)
    } catch (err) {
        callback(err)
    }   
}
