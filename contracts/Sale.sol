pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract Sale is AccessControl {

    struct Owner {
        address addr;
        bool approval;
        address stakeholderAddress;
        uint percentage;
    }

    struct Middleman {
        address addr;
        bool approval;
    }

    struct Buyer {
        address addr;
        bool approval;
        uint paymentAmount;
    }

    Owner owner;
    Buyer buyer;
    Buyer bank;
    Middleman middleman;
    uint deedPrice;

    bytes32 private constant OWNER = keccak256("OWNER");
    bytes32 private constant MIDDLEMAN = keccak256("MIDDLEMAN");
    bytes32 private constant BUYER = keccak256("BUYER");
    bytes32 private constant BANK = keccak256("BANK");

    constructor(address _stakeholderAddress, uint _percentage) {
        _grantRole(OWNER, msg.sender);
        owner = Owner(msg.sender, false, _stakeholderAddress, _percentage);
    }

    function setPrice(uint256 _deedPrice) public onlyRole(OWNER){
        deedPrice = _deedPrice;
    }

    function addBuyer(address _buyer) public onlyRole(OWNER) {
        _grantRole(BUYER, _buyer);
        buyer = Buyer(_buyer, false, 0);
        buyer.addr = _buyer;
    }

    function removeBuyer() public onlyRole(OWNER) {
        buyer.addr = address(0);
    }

    function approveOwner() public payable onlyRole(OWNER){
        owner.approval = true;
        IERC20 stakeholder = IERC20(owner.stakeholderAddress);
        stakeholder.transfer(address(this), owner.percentage);
    }

    function execute() public payable {

        IERC20 stakeholder = IERC20(owner.stakeholderAddress);
        stakeholder.transfer(buyer.addr, owner.percentage); //with approve?

        IERC20 avax = IERC20(0xf8e81D47203A594245E36C48e151709F0C19fBe8);
        avax.transfer(owner.addr, deedPrice); //with approve?

    }

    function getAddress() public view returns(address){
        return owner.stakeholderAddress;
    }

    function getOwner() public view returns(address){
        return owner.addr;
    }

    function getPrice() public view returns(uint){
        return deedPrice;
    }

    function getPercentage() public view returns(uint){
        return owner.percentage;
    }
}