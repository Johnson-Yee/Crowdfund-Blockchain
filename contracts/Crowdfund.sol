pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Crowdfund {
    event StartCampaign(uint id, address creator, uint goal, uint startTime, uint endTime);
    event DropCampaign(uint id);

    struct Campaign {
        address creator;
        uint minContribution; //in weis
        uint currentAmount;
        uint goal;
        uint32 startTime;
        uint32 endTime;
        bool claimed;
    }
    IERC20 public immutable token;
    uint public campaignCount;
    mapping(uint=> Campaign) public ongoingCampaigns; // map count to campaign e.g 0 => Campaign object
    mapping(uint=> mapping(address=>uint)) public potentialDonations; // map count to dict e.g 0 => {address1:100wei, ...., addressN:200wei}

    constructor(address _creator) {
        token = IERC20(_creator);
    }

    function startCampaign(uint _goal, uint32 _startTime, uint32 _endTime) external {
        require(_startTime >= block.timestamp, "start must be after block creation");
        require(_startTime <= _endTime, "start must be before endTime");
        campaignCount++;
        ongoingCampaigns[campaignCount] = Campaign({
            creator : msg.sender,
            minContribution: 100,
            currentAmount: 0,
            goal: _goal,
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

}
