pragma solidity >=0.7.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Stakeholder is ERC20, Ownable, ERC20Permit, ERC721Holder {

    IERC721 public collection;
    uint256 tokenId;
    bool isInitilized = false;

    constructor() ERC20("Stakeholder", "SH") ERC20Permit("Stakeholder") {}

    function initilaze(address _collection, uint256 _tokenId) external onlyOwner {
        require(!isInitilized);
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokenId = _tokenId;
        isInitilized = true;
        _mint(msg.sender, 100);
    }
}
