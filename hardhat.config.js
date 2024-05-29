require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: "./env/config.env" });

module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
            url: `${process.env.RPC_URL}`,
            accounts: [`${process.env.WALLET_DEPLOY_PRIVATE_KEY}`],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.API_SCAN,
        },
    },
    defaultNetwork: "hardhat",
};
