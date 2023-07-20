export interface IAmount {
  denom: string;
  amount: string;
}

export interface IFee {
  amount: IAmount[];
  gas: string;
}
