import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const CONTRACT = await ethers.getContractFactory("MockNesting");
  const contract = await CONTRACT.deploy();
  await contract.deployed();
  console.log(`Contract deployed to: ${contract.address}`);

  const idsToMint = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let tx = await contract.mint(idsToMint);
  await tx.wait();
  console.log(`${idsToMint} have been minted to ${owner.address}`);

  tx = await contract.setLodgingOpen(true);
  await tx.wait();
  console.log(`Lodging has been set to open`);

  // toggle lodging for every even id
  tx = await contract.toggleLodging(idsToMint.filter((i) => i % 2 == 0));
  await tx.wait();
  console.log(
    `${idsToMint.filter((i) => i % 2 == 0)}'s lodging has been toggled`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
