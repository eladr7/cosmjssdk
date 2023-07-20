import { Block, StargateClient } from "@cosmjs/stargate";

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getNumPools = async (): Promise<number> => {
  // Placeholder. Will be changed later to the true logic
  return Math.floor(Math.random() * 1000);
};

export const blockQuerier = async () => {
  const client = await StargateClient.connect(
    "https://rpc.osmotest5.osmosis.zone"
  );
  let lastQueriedHeight = 0;

  // Continuously check for the latest block
  while (true) {
    // Getting the latest block
    const block: Block = await client.getBlock();

    // If block height was updated is divisible by 10, query number of pools
    if (
      block.header.height !== lastQueriedHeight &&
      block.header.height % 10 === 0
    ) {
      lastQueriedHeight = block.header.height;
      const numPools = await getNumPools();

      console.log("Block height: ", block.header.height);
      console.log("Block hash: ", block.id);
      console.log("Number of pools: ", numPools);
    }

    // Sleep for 1 second before querying again
    await sleep(1000);
  }
};

blockQuerier().catch(console.error);
