// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (token/ERC20/IERC20.sol)
pragma solidity ^0.8.0;

//import "./IERC20.sol";


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Crowdfund {
    event StartCampaign(uint id, address creator, uint goal, uint startTime, uint endTime);
    event DropCampaign(uint id);

    event Donate(uint indexed _id, address indexed caller,uint amount);
    event Withdraw(uint indexed _id,address indexed caller,uint amount);

    event ProcessFunds(uint id);
    event Reimburse(uint id, address indexed caller, uint amount);


    struct Campaign {
        address creator;
        uint minContribution; //in weis
        uint currentAmount;
        uint goal;
        uint balance;
        uint32 startTime;
        uint32 endTime;
        bool claimed;
    }

    /*
    IERC20 public immutable token;
    */
    uint public campaignCount;
    mapping(uint=> Campaign) public ongoingCampaigns; // map count to campaign e.g 0 => Campaign object
    mapping(uint=> mapping(address=>uint)) public potentialDonations; // map count to dict e.g 0 => {address1:100wei, ...., addressN:200wei}

    /*
    constructor(address _token) {
        token = IERC20(_token);
    }
    */

    function startCampaign(uint _goal, uint32 _startTime, uint32 _endTime) external {
        require(_startTime >= block.timestamp, "start must be after block creation");
        require(_startTime <= _endTime, "start must be before endTime");
        campaignCount++;
        ongoingCampaigns[campaignCount] = Campaign({
            creator : msg.sender,
            minContribution: 100,
            currentAmount: 0,
            goal: _goal,
            balance: _balance,
            startTime: _startTime,
            endTime: _endTime,
            claimed: false
        });
        emit StartCampaign(campaignCount, msg.sender, _goal, _startTime, _endTime);

    }

    modifier isOwner(uint _id) {
        require(msg.sender == ongoingCampaigns[_id].creator, "Only creator of this campaign can call this function.");
        _;
    }
    function dropCampaign(uint _id) public isOwner(_id) {
        Campaign memory campaign = ongoingCampaigns[_id];
        require(block.timestamp < campaign.startTime, "Campaign has already started");
        delete ongoingCampaigns[_id];
        emit DropCampaign(_id);
    
    }
    
    function donate(uint _id, uint _amount) external {
        Campaign storage campaign = ongoingCampaigns[_id];
        require(block.timestamp >= campaign.startTime, "not started");
        require(block.timestamp <= campaign.endTime, "ended");

        campaign.currentAmount += _amount;
        potentialDonations[_id][msg.sender] += _amount;
        token.transferFrom(msg.sender, address(this), _amount);

        emit Donate(_id, msg.sender, _amount);
    }



    function withdraw(uint _id, uint _amount) external {
        Campaign storage campaign = ongoingCampaigns[_id];
        require(block.timestamp <= campaign.endTime, "ended");

        campaign.currentAmount -= _amount;
        potentialDonations[_id][msg.sender] -= _amount;
        token.transfer(msg.sender, _amount);

        emit Withdraw(_id, msg.sender, _amount);
    }      


    function processFunds(uint _id) external {

        Campaign storage campaign = ongoingCampaigns[_id];
        require(campaign.creator == msg.sender, "not creator");
        require(block.timestamp > campaign.endTime, "not ended");
        require(campaign.currentAmount >= campaign.goal, "current ammount < goal");
        require(!campaign.claimed, "claimed");

        campaign.claimed = true;
        token.transfer(campaign.creator, campaign.currentAmount);

        emit ProcessFunds(_id);
    }
    // Sends money back only after campaign has finished and campaign did not have sufficent funds
    function reimburse(uint _id) external {
        Campaign memory campaign = ongoingCampaigns[_id];
        require(block.timestamp > campaign.endTime, "not ended");
        require(campaign.currentAmount < campaign.goal, "pledged >= goal");

        uint bal = potentialDonations[_id][msg.sender];
        potentialDonations[_id][msg.sender] = 0;
        token.transfer(msg.sender, bal);

        emit Reimburse(_id, msg.sender, bal);
    
    }

}
