pragma solidity ^0.8.3;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract StakeHolder is ERC20, ERC20Permit, ERC721Holder{

    uint256 tokenId;
    bool isInitilized = false;
    IERC721 public collection;

    constructor() ERC20("Stakeholder", "SH") ERC20Permit("Stakeholder"){

    }

    function init(address _collection, uint _tokenId) public {
        require(!isInitilized);
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokenId = _tokenId;
        _mint(msg.sender, 100);
        isInitilized = true;
    }
}
