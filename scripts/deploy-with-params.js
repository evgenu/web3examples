const hre = require('hardhat')
const ethers = hre.ethers;

async function deployElectionContract(_privateKey) {
    await hre.run('compile'); 
    const wallet = new ethers.Wallet(_privateKey, hre.ethers.provider) 
    console.log('Deploying contracts with the account:', wallet.address); 
    console.log('Account balance:', (await wallet.getBalance()).toString()); 

    const USElection = await ethers.getContractFactory("USElection", wallet); 
    const usElectionContract = await USElection.deploy();
    console.log('Waiting for USElection deployment...');
    await usElectionContract.deployed();

    console.log('USElection Contract address: ', usElectionContract.address);
    console.log('Done!');
}
  
module.exports = deployElectionContract;