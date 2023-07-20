import { Block, StargateClient } from "@cosmjs/stargate";
import { osmosis } from "osmojs";
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

      outputElement.innerHTML = `
        <div style="display: flex; flex-direction: column; background-color: lightgrey; padding: 10px; margin: 10px; border-radius: 10px; border: 1px solid grey;">
          <p style="color: darkblue;">Block height: ${block.header.height}</p>
          <p style="color: darkblue;">Block hash: ${block.id}</p>
          <p style="color: darkblue;">Number of pools: ${numPools}</p>
        </div>
      `;
    }

    // Sleep for 1 second before querying again
    await sleep(1000);
  }
};
