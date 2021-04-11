// contracts/PlayerToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./APIConsumer.sol";

// TODO: Change PlayerToken to something more descriptive, like PlayerTokenGenerator.
contract PlayerTokenGenerator is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;

    address public LinkToken;

    APIConsumer apiConsumer = new APIConsumer();

    struct Player {
        string name;
        uint256 uid; // A random number that uniquely identifies this token.
        // uint256 total_goals;
        // uint256 yellow_cards;
        // uint256 red_cards;
        // uint256 total_assists;
        // uint256 age;
        // uint256 jersey_number;
        // string name; // Watch for a duplicate of this value.
        // string team_name;
        // string position;
        // string preferred_foot;
    }

    Player[] public players;

    mapping(bytes32 => string) requestToPlayerName;
    mapping(bytes32 => address) requestToSender;
    mapping(bytes32 => uint256) requestToTokenId;

    /**
     * Constructor inherits VRFConsumerBase
     *
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash)
        public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
        ERC721("Surinaamse Voetbal Bond", "SVB")
    {   
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    // Make async call to Chainlink VRF.
    function requestNewRandomPlayerToken(
        uint256 userProvidedSeed,
        string memory name
    ) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToPlayerName[requestId] = name;
        requestToSender[requestId] = msg.sender; // Set the address value for this request id key to the sender's address.
        return requestId;
    }

    // 
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }

    
    // TODO: Modify this to create a unique ID, rather than randomly generated stats.
    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
        internal
        override
    {
        // This will give players sequential nummerical ids, in order of creation.
        uint256 newId = players.length;
        uint256 uid = randomNumber;

        players.push(
            Player(
                requestToPlayerName[requestId],
                uid
                // 0,
                // 0,
                // 0,
                // 0,
                // 0,
                // 0,
                // "",
                // "",
                // "",
                // ""
            )
        );
         _safeMint(requestToSender[requestId], newId);
    }

    // function getLevel(uint256 tokenId) public view returns (uint256) {
    //     return sqrt(players[tokenId].experience);
    // }

    function getNumberOfPlayers() public view returns (uint256) {
        return players.length; 
    }

    function getPlayerOverView(uint256 tokenId)
        public
        view
        returns (
            string memory,
            uint256

        ) 
    {
        return (
            // TODO: Make sure that we're returning complete player stats here.
            players[tokenId].name,
            players[tokenId].uid
            // players[tokenId].total_goals + players[tokenId].yellow_cards + players[tokenId].red_cards + players[tokenId].total_assists + players[tokenId].age
            //getLevel(tokenId)
        );
    }

    function getPlayerStats(uint256 tokenId)
        public
        view
        returns (
            string memory,
            uint256
            // uint256,
            // uint256,
            // uint256,
            // uint256
        )
    {
        // TODO: We want to return all stats here, but doing so exceeds our max stack depth. Returning struct may solve this issue.
        return (
            players[tokenId].name,
            players[tokenId].uid
            // players[tokenId].jersey_number,
            // players[tokenId].yellow_cards,
            // players[tokenId].red_cards,
            // players[tokenId].total_goals,
            // players[tokenId].total_assists
        );
    }

    // Get player goals from Chainlink node.
    function getPlayerGoals()
        public
        returns(
            bytes32
        )
        {
            bytes32 requestId = apiConsumer.requestPlayerGoals();
        // How do I get the result after fullfil is called in APIConsumer?
            return requestId;
        }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}