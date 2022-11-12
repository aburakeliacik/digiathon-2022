// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.3;

import './Sale.sol';

contract MainContract {
  uint public saleId = 0;
  mapping (uint => address) public Sales;

  function createElection (address stakeholderAddr, uint percentage, uint fiyat) public {
    Sale election = new Sale(stakeholderAddr, percentage, fiyat);
    Sales[saleId] = address(election);
    saleId++;
  }
}