pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
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
        bank = Buyer(address(0), false, 0);
    }

    function setPrice(uint256 _deedPrice) public onlyRole(OWNER){
        deedPrice = _deedPrice;
        owner.approval = false;
        buyer.approval = false;
        bank.approval = false;
        middleman.approval = false;
    }

    function addBuyer(address _buyer) public onlyRole(OWNER) {
        _grantRole(BUYER, _buyer);
        buyer = Buyer(_buyer, false, 0);
        buyer.addr = _buyer;
    }

    function removeBuyer() public onlyRole(MIDDLEMAN) {
        buyer.addr = address(0);
    }

    function approveOwner() public onlyRole(OWNER){
        owner.approval = true;
        IERC20 stakeholder = IERC20(owner.stakeholderAddress);
        stakeholder.approve(address(this), owner.percentage);
    }

    function approveBuyer(uint _price) public payable onlyRole(BUYER){
        require(owner.approval, "Tapu sahibi onayi gerekiyor.");
        buyer.paymentAmount = _price;
        buyer.approval = true;
        execute();
    }

    function execute() public 
    { 
        require(owner.approval,"Tapu sahibi onayi gerekiyor.");
        require(buyer.approval,"Alici onayi gerekiyor.");
        require(buyer.paymentAmount >= deedPrice, "Alicinin yetkilendirdigi para tutari yeterli degildir.");
        IERC20 stakeholder = IERC20(owner.stakeholderAddress);
        stakeholder.transferFrom(owner.addr, buyer.addr, 1); 

//        IERC20 stakeholder = IERC20(owner.stakeholderAddress);
//        stakeholder.transferFrom(owner.addr, buyer.addr, 1); 

    }


    function getAddress() public view returns(address){
        return owner.stakeholderAddress;
        
    }


}