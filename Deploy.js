// call contract with web3 on bsc testnet
require("dotenv").config({ path: "./env/config.env" });
const Web3 = require("web3");
const web3rpc = new Web3(
    new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
);
const data = require("./tokenbound.json");

// const contract = new web3rpc.eth.Contract(abi, contractAddress);
const deploy2 = async () => {
    const nameContracts = [
        "ERC6551ResistryInput",
        "ERC6551AccountProxyInput",
        "ERC6551AccountImplementInput",
    ];
    const addressContracts = [
        // "0x000000006551c19487814612e58FE06813775758",
        "0xA5467dfe7019bF2C7C5F7A707711B9d4cAD118c8",
        "0x55266d75D1a14E4572138116aF39863Ed6596E7F",
        "0x41C8f39463A868d3A88af00cd0fe7102F30E44eC",
    ];

    for (let i = 0; i < nameContracts.length; i++) {
        //get bytecode contract
        const bytecode = await web3rpc.eth.getCode(addressContracts[i]);
        if (bytecode === "0x") {
            await subDeploy(nameContracts[i]);
        }
    }
};
const subDeploy = async (_nameContract) => {
    const tx = {
        from: "0x0c915dc6c8019AbC69D3D024F85B1EAF3cE0f591",
        to: "0x4e59b44847b379578588920cA78FbF26c0B4956C",
        data: data[_nameContract],
        gas: 5000000,
    };
    const signed = await web3rpc.eth.accounts.signTransaction(
        tx,
        process.env.WALLET_DEPLOY_PRIVATE_KEY
    );

    const receipt = await web3rpc.eth.sendSignedTransaction(signed.rawTransaction);
    console.log(receipt);
};
deploy2();
