(async() => {
    try {
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");

        const spacebearInstance = await Spacebear.deploy();

        console.log(`Deployed contract at ${spacebearInstance.target}`);
    } catch(e) {
        console.log(e);
        process.exitCode = 1;
    }
})()