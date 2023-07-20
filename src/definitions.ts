export interface IAmount {
  denom: string;
  amount: string;
}

export interface IFee {
  amount: IAmount[];
  gas: string;
}

export const generateBlockInfoHTML = (
  blockHeight: number,
  blockHash: string,
  numPools: number
): string => `
  <div style="display: flex; flex-direction: column; background-color: lightgrey; padding: 10px; margin: 10px; border-radius: 10px; border: 1px solid grey;">
    <p style="color: darkblue;">Block height: ${blockHeight}</p>
    <p style="color: darkblue;">Block hash: ${blockHash}</p>
    <p style="color: darkblue;">Number of pools: ${numPools}</p>
  </div>
`;
