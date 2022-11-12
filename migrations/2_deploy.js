//const test = artifacts.require("Deeds");
//const test1 = artifacts.require("StakeHolder");
const test2 = artifacts.require("MainContract");

module.exports = function (deployer) {
  deployer.deploy(test2);
  //deployer.deploy(test1);
};