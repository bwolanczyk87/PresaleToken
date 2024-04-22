// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function totalSupply() external view returns (uint256);
}

contract TokenPresale {
    address public owner;
    address public saleToken;
    bool public paused;
    uint8 public stage;
    uint128 public blockStart;
    uint128 public currentStageBlockStart;
    uint128 public UNIT_PRICE;
    uint64 public STAGE_BLOCKS_DURATION;
    uint256 public STAGE_MAX_TOKENS;
    uint256 public currentStageMaxPerWallet;
    uint64 public STAGE_PRICE_INCREMENT;

    mapping(uint8 => uint256) public stageAvailableAmount;
    mapping(uint8 => uint256) public stageMaxAmount;
    mapping(uint8 => uint256) public stagePrices;
    mapping(address => uint256) public soldAmountPerWallet;


    constructor(address _saleToken) {
        owner = msg.sender;
        saleToken = _saleToken;
        stage = 1;

        IERC20 token = IERC20(_saleToken);
        uint256 totalSupply = token.totalSupply();

        STAGE_MAX_TOKENS = totalSupply;
        currentStageMaxPerWallet = totalSupply;

        stageAvailableAmount[stage] = totalSupply;
        stageAvailableAmount[stage] = totalSupply;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "OwnableInvalidOwner");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "ExpectedPause");
        _;
    }

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Paused(address account);
    event Unpaused(address account);
    event Sale(address indexed user, uint256 indexed stage, uint256 qty, uint256 amount);

    error EnforcedPause();
    error ExpectedPause();
    error OwnableInvalidOwner();
    error OwnableUnauthorizedAccount();
    error ReentrancyGuardReentrantCall();

    function pause() public onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "OwnableInvalidOwner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(owner, address(0));
        owner = address(0);
    }

    function startSale(uint256 start) public onlyOwner {
        currentStageBlockStart = uint128(start);
    }

    function tokenSale(uint256 qty) public payable whenNotPaused returns (bool) {
        require(msg.value >= qty * UNIT_PRICE, "Insufficient payment");
        require(soldAmountPerWallet[msg.sender] + qty <= currentStageMaxPerWallet, "Purchase limit exceeded");

        soldAmountPerWallet[msg.sender] += qty;
        stageAvailableAmount[stage] -= qty;
        
        emit Sale(msg.sender, stage, qty, msg.value);
        return true;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // View functions for contract state querying
    function currentStagePrice() public view returns (uint256) {
        return stagePrices[stage];
    }

    function currentStageAvailableAmount() public view returns (uint256) {
        return stageAvailableAmount[stage];
    }

    function currentStageMaxAmount() public view returns (uint256) {
        return stageMaxAmount[stage];
    }

    function currentStageSoldAmount(address to) public view returns (uint256) {
        return soldAmountPerWallet[to];
    }

    function setCurrentStagePrice(uint256 value) public onlyOwner() {
        stagePrices[stage] = value;
    }
}
