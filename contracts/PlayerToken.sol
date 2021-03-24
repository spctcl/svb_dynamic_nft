// contracts/PlayerToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract PlayerToken is ERC721, VRFConsumerBase, Ownable {
    using SafeMath for uint256;
    using Strings for string;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    address public VRFCoordinator;

    address public LinkToken;

    struct Player {
        uint256 id;
        uint256 total_goals;
        uint256 yellow_cards;
        uint256 red_cards;
        uint256 total_assists;
        uint256 age;
        uint256 jersey_number;
        string name;
        string team_name;
        string position;
        string preferred_foot;
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
        ERC721("PlayerToken", "SVB")
    {   
        VRFCoordinator = _VRFCoordinator;
        LinkToken = _LinkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; // 0.1 LINK
    }

    function requestNewRandomPlayer(
        uint256 userProvidedSeed,
        string memory name
    ) public returns (bytes32) {
        require(
            LINK.balanceOf(address(this)) >= fee,
            "Not enough LINK - fill contract with faucet"
        );
        bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
        requestToPlayerName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        return requestId;
    }

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
        uint256 newId = players.length;

        // players.push(
        //     Player(
        //         id
        //     )
        // );
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
            players[tokenId].total_goals + players[tokenId].yellow_cards + players[tokenId].red_cards + players[tokenId].total_assists + players[tokenId].age
            //getLevel(tokenId)
        );
    }

    function getPlayerStats(uint256 tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            string memory
        )
    {
        return (
            players[tokenId].id,
            players[tokenId].total_goals,
            players[tokenId].yellow_cards,
            players[tokenId].red_cards,
            players[tokenId].total_assists,
            players[tokenId].jersey_number,
            players[tokenId].name
        );
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