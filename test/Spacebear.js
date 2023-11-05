const {expect} = require("chai");
const hre = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

describe("Spacebear", function() {
    async function deploySpacebearAndMint() {
        const Spacebear = await hre.ethers.getContractFactory("Spacebear");
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const spacebearInstance = await Spacebear.deploy();
        await spacebearInstance.safeMint(otherAccount.address);
        return {spacebearInstance};
    }
    it("is possible to mint a token", async() =>{
        const {spacebearInstance} =await loadFixture(deploySpacebearAndMint);
        const [owner, otherAccount] = await hre.ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);
    })

    it("should fail if token transfer from the wrong address", async() => {
        const {spacebearInstance} = await loadFixture(deploySpacebearAndMint);
        const [owner, otherAccount, NotTheNFTOwner] = await hre.ethers.getSigners();
        expect(await spacebearInstance.ownerOf(0)).to.equal(otherAccount.address);

        await expect(spacebearInstance.connect(NotTheNFTOwner).transferFrom(otherAccount.address, NotTheNFTOwner.address,0)).to.be.reverted;
    })
})