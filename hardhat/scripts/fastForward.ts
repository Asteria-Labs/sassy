import { mine } from "@nomicfoundation/hardhat-network-helpers";

async function main() {
  await mine(1000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
