// call contract with web3 on bsc testnet
require("dotenv").config({ path: "./env/config.env" });
const Web3 = require("web3");
const web3rpc = new Web3(
    // new Web3.providers.HttpProvider("https://polygon-mumbai.api.onfinality.io/public")
    new Web3.providers.HttpProvider("http://127.0.0.1:8545")
);
const data = require("./tokenbound.json");

// const contract = new web3rpc.eth.Contract(abi, contractAddress);
const deploy2 = async () => {
    // check create2 factory available
    const create2Factory = await web3rpc.eth.getCode("0x4e59b44847b379578588920ca78fbf26c0b4956c");
    if (create2Factory === "0x") {
        console.log("Create2 factory not found");
        return;
    }
    for (let i = 0; i < data.length; i++) {
        const bytecode = await web3rpc.eth.getCode(data[i][0]);
        // console.log(data[i][0], bytecode);
        if (bytecode === "0x") {
            console.log(`Deploying ${data[i][1]} at ${data[i][0]}...`);
            await subDeploy(i);
        } else {
            console.log(`Skipping ${data[i][1]} at ${data[i][0]}...`);
        }
    }
};
const subDeploy = async (_index) => {
    if (data[_index][0] === "0xEF7B07Db21d449C50b00De4563FfFe4C9dd33f1f") {
        const multicall3 = await web3rpc.eth.getCode("0xcA11bde05977b3631167028862bE2a173976CA11");
        if (multicall3 === "0x") {
            console.log(
                "Multicall3 not found, only 0x05f32B3cC3888453ff71B01135B34FF8e41263F2 can deploy multicall3"
            );
            return;
        }
    }
    const tx = {
        to: "0x4e59b44847b379578588920cA78FbF26c0B4956C",
        data: data[_index][3],
        gas: data[_index][2],
    };
    const signed = await web3rpc.eth.accounts.signTransaction(
        tx,
        // process.env.WALLET_DEPLOY_PRIVATE_KEY
        process.env.WALLET_DEPLOY_PRIVATE_KEY
    );
    const receipt = await web3rpc.eth.sendSignedTransaction(signed.rawTransaction);
    console.log(receipt);
};
deploy2();
