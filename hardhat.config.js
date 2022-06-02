require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async (taskArguments, hre, runSuper) => {
        const deployElectionContract = require("./scripts/deploy");
        const USElectionCon = await deployElectionContract(taskArguments);
        console.log(USElectionCon);
        await hre.run('verifycontract', { scontractAddress: USElectionCon.address })
    });

subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
    });

subtask("verifycontract", "Verifies the contract")
    .addParam("scontractAddress", "Specify the contract")
    .setAction(async (scontractAddress) => {
        await hre.run("verify:verify", {
          address: scontractAddress.scontractAddress,
          constructorArguments: [],
        });
    });

task("deploy-mainnet", "Deploys contract on a provided network")
.addParam("privateKey", "Please provide the private key")
.setAction(async ({privateKey}) => {
    const deployElectionContract = require("./scripts/deploy-with-param");
    await deployElectionContract(privateKey);
});

task("etherstest", "Testing ethers.js")
  .setAction(async () => {
    const runEthersTest = require("./scripts/etherstest.js");
    await runEthersTest();
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/26e66a82aa8c42eb938c7b2e1d01a404", // infura link
      accounts: ['87dc1fe90ba61b010973edec234105d8705742de95c84b8b054c16b6fe05c9b2'] //metamask private key
    }
  },
  etherscan: {
    apiKey: "5HI9YQV496K6RQI7QGKIDIZ54JUQAT4J3R"
  }
};
