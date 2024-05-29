const h = require("hardhat");

async function main() {
    console.log("Verifying contract Account Guardian");
    // const Registry = await ethers.deployContract("AccountGuardian");
    // const registry = await Registry.waitForDeployment();
    console.log("Verifying Registry contract");
    await h.run("verify:verify", {
        address: "0x2FE5ccb0d7Ea195FEb87987d3573F9fcCE2b5D57",
        contract: "contracts/AccountGuardian.sol:AccountGuardian",
        constructorArguments: [],
    });
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
