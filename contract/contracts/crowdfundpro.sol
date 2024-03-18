// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdfundPro {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        uint256 amountWithdrawn;
        string image;
        address[] donators;
        uint256[] donations;
        bool targetReached; // Flag to track if the target has been reached
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // Create a new campaign
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.amountWithdrawn = 0;
        campaign.image = _image;
        campaign.targetReached = false;
        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    // Donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign ID does not exist.");
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "Campaign deadline has passed.");
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.amountCollected += amount;
        if (campaign.amountCollected >= campaign.target) {
            campaign.targetReached = true;
        }
    }

    // Withdraw funds collected by the campaign owner
    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only the campaign owner can withdraw funds.");
        
        // Validation for withdrawal conditions
        require(campaign.targetReached || block.timestamp > campaign.deadline, "Funds cannot be withdrawn yet.");
        
        uint256 amountToWithdraw = campaign.amountCollected - campaign.amountWithdrawn;
        require(amountToWithdraw > 0, "No funds available for withdrawal.");
        campaign.amountWithdrawn += amountToWithdraw;
        payable(campaign.owner).transfer(amountToWithdraw);
    }
    

    // Get list of donators and their donations for a campaign
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Get details of all campaigns
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
