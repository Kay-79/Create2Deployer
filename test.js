// call contract with web3 on bsc testnet
require("dotenv").config({ path: "./env/config.env" });
const Web3 = require("web3");
const web3rpc = new Web3(
    // new Web3.providers.HttpProvider("https://polygon-mumbai.api.onfinality.io/public")
    new Web3.providers.HttpProvider("http://localhost:8545")
);
// const data = require("./tokenbound.json");

// const contract = new web3rpc.eth.Contract(abi, contractAddress);
const sendTx = async (_index) => {
    const tx = {
        to: "0x872af6a4D5175f0C98a348a4f42847ACFBd68e9a",
        data: "0x",
        gas: 30000,
        value: 999 * 10 ** 18,
    };
    const signed = await web3rpc.eth.accounts.signTransaction(
        tx,
        process.env.WALLET_DEPLOY_PRIVATE_KEY
    );
    const receipt = await web3rpc.eth.sendSignedTransaction(
        signed.rawTransaction
    );
    console.log(receipt);
};
sendTx();
