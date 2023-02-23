// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MockNesting is ERC721("Mock ERC721", "mErc721"), Ownable {
    /**
    @dev tokenId to lodging start time (0 = not lodging).
    */
    mapping(uint256 => uint256) private lodgingStarted;

    /**
    @dev Cumulative lodging period.
    */
    mapping(uint256 => uint256) private lodgingTotal;

    /**
    @notice Returns the length of time, in seconds, that the Sassy has
    been lodged.
    @dev Lodging is tied to a specific Sassy, not to the owner, so it doesn't
    reset upon sale.
    @return lodging Whether the Sassy is currently lodging. MAY be true with
    zero current lodging if in the same block as lodging began.
    @return current Zero if not currently lodging, otherwise the length of time
    since the most recent lodging began.
    @return total Total period of time for which the Sassy has lodged across
    its life, including the current period.
     */
    function lodgingPeriod(uint256 tokenId)
        public
        view
        returns (
            bool lodging,
            uint256 current,
            uint256 total
        )
    {
        uint256 start = lodgingStarted[tokenId];
        if (start != 0) {
            lodging = true;
            current = block.timestamp - start;
        }
        total = current + lodgingTotal[tokenId];
    }

    uint256 private lodgingTransfer = 1;

    /**
    @notice Transfer a token between addresses while the Sassy is minting,
    thus not resetting the lodging period.
    */
    function safeTransferWhileLodging(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(
            ownerOf(tokenId) == _msgSender(),
            "Shredding Sassy: Only Owner!"
        );
        lodgingTransfer = 2;
        safeTransferFrom(from, to, tokenId);
        lodgingTransfer = 1;
    }

    /**
    @dev Block transfers while lodging.
     */
    function _beforeTokenTransfer(
        address,
        address,
        uint256 tokenId,
        uint256
    ) internal view override {
        require(
            lodgingStarted[tokenId] == 0 || lodgingTransfer == 2,
            "Sassy is Lodged!"
        );
    }

    /**
    @dev Emitted when a Sassy begins lodging.
    */
    event Lodged(uint256 indexed tokenId);

    /**
    @dev Emitted when a Sassy stops lodging.
    */
    event Unlodged(uint256 indexed tokenId);

    /**
    @notice Whether lodging is currently allowed.
    @dev If false then lodging is blocked, but unlodging is always allowed.
    */
    bool public lodgingOpen = false;

    /**
    @notice Toggles the `lodgingOpen` flag.
    This will stop/start ability to lodge the Sassy.
    */
    function setLodgingOpen(bool open) public onlyOwner {
        lodgingOpen = open;
    }

    /** 
    @dev Modifier restricting to only owner to toggle Lodging.
    */
    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(
            ownerOf(tokenId) == _msgSender() ||
                getApproved(tokenId) == _msgSender(),
            "You are not approved, nor are you the owner!"
        );
        _;
    }

    /**
    @notice Changes the Sassy's lodging status.
    */
    function toggleLodging(uint256 tokenId)
        internal
        onlyApprovedOrOwner(tokenId)
    {
        uint256 start = lodgingStarted[tokenId];
        if (start == 0) {
            require(lodgingOpen, "Sassy: Lodging Closed!");
            lodgingStarted[tokenId] = block.timestamp;
            emit Lodged(tokenId);
        } else {
            lodgingTotal[tokenId] += block.timestamp - start;
            lodgingStarted[tokenId] = 0;
            emit Unlodged(tokenId);
        }
    }

    /**
    @notice Changes the Sassy lodging status. 
    Format is in Array [tokenId , tokenId...].
    */
    function toggleLodging(uint256[] calldata tokenIds) public {
        uint256 n = tokenIds.length;
        for (uint256 i = 0; i < n; ++i) {
            toggleLodging(tokenIds[i]);
        }
    }

    function mint(uint256[] calldata ids) external {
        for (uint256 i; i < ids.length; ++i) {
            _mint(msg.sender, ids[i]);
        }
    }

    function mintTo(address to, uint256[] calldata ids) external {
        for (uint256 i; i < ids.length; ++i) {
            _mint(to, ids[i]);
        }
    }
}
