pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {
  
    uint256 public goals;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    
    /**
     * Network: Kovan
     * Oracle: 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
     * Job ID: 29fa9aa13bf1468788b7cc4a500a45b8
     * Fee: 0.1 LINK
     */
    constructor() public {
        setPublicChainlinkToken();
        oracle = 0x86fddC240cE9Ec08308E719806156d7c93Bed1fA;
        jobId = "d42dadc2e4114fa595250e85efbf18c1";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }
    
    // Make a request the CL node with a jobId, the address of this contract, and the contract to call with the results.
    function requestPlayerGoals() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _goals) public recordChainlinkFulfillment(_requestId)
    {
        goals = _goals;
        // This is where you'd trigger dynamic creation of metadata.
    }
}