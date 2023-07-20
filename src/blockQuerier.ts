import { Block, StargateClient } from "@cosmjs/stargate";
import { osmosis } from "osmojs";
import { generateBlockInfoHTML } from "./definitions";
const { createRPCQueryClient } = osmosis.ClientFactory;

const rpcEndpoint = process.env.RPC_ENDPOINT;
const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getNumPools = async (osmosisClient: any): Promise<number> => {
  // Query the osmosis pools
  const response = await osmosisClient.osmosis.gamm.v1beta1.pools();
  return response.pools.length;
};

export const blockQuerier = async (outputElement: HTMLElement) => {
  const stargateClient = await StargateClient.connect(rpcEndpoint!);
  const osmosisClient = await createRPCQueryClient({
    rpcEndpoint: rpcEndpoint!,
  });

  // Continuously check for the latest block
  let lastQueriedHeight: number = 0;
  while (true) {
    // Getting the latest block
    const block: Block = await stargateClient.getBlock();

    // If block height was updated is divisible by 10, query number of pools
    if (
      block.header.height !== lastQueriedHeight &&
      block.header.height % 10 === 0
    ) {
      lastQueriedHeight = block.header.height;
      const numPools = await getNumPools(osmosisClient);

      console.log("Block height: ", block.header.height);
      console.log("Block hash: ", block.id);
      console.log("Number of pools: ", numPools);

      // Write the block data to the browser
      outputElement.innerHTML = generateBlockInfoHTML(
        block.header.height,
        block.id,
        numPools
      );
    }

    // Sleep for 1 second before querying again
    await sleep(1000);
  }
};
