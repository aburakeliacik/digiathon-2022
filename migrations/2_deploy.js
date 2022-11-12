const test = artifacts.require("HelloWorld");

module.exports = function (deployer) {
  deployer.deploy(test);
};