const { ethers } = require("hardhat");

async function getBlockNumber() {
    try {
        const provider = ethers.provider;

        let blockNumber = await provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNumber}`);

        await provider.send("evm_mine", []); // Mine an empty block

        blockNumber = await provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNumber}`);
        
        const [account0, account1] = await ethers.getSigners();
        const tx = await account0.sendTransaction({
            to: account1.address,
            value: ethers.utils.parseEther("0.001")
        });
        console.log(`Sent transaction from ${account0.address} to ${account1.address}: ${tx.hash}`);
        
        blockNumber = await provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNumber}`);

        console.log("Test passed!");
        console.log("/////////////////answer/////////////////");
        // Wait for the transaction to be mined using provider.waitForTransaction
        const receipt = await provider.waitForTransaction(tx.hash, 1); // Wait for 1 confirmation
        console.log("Transaction Receipt:", receipt);
        const block = await provider.getBlock(blockNumber);
        console.log("Block Details: ", block);
        console.log("/////////////////answer/////////////////");
    } catch (error) {
        console.error("Error fetching block number:", error);
        process.exit(1);
    }
}

getBlockNumber().catch((error) => {
    console.error(error);
    process.exit(1);
});