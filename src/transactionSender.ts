import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { IAmount, IFee } from "./definitions";
const rpcEndpoint = process.env.PROD_RPC_ENDPOINT;

const sendStarCoinsInner = async (
  mnemonic: string,
  recipient: string,
  amount: IAmount,
  fee: IFee
) => {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
  const [firstAccount] = await wallet.getAccounts();

  const client = await SigningStargateClient.connectWithSigner(
    rpcEndpoint!,
    wallet
  );

  const result = await client.sendTokens(
    firstAccount.address,
    recipient,
    [amount],
    fee,
    "Have fun with your star coins"
  );

  assertIsDeliverTxSuccess(result);

  return result;
};

export const sendStarCoins = async () => {
  const mnemonic =
    "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
  const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";

  const amount: IAmount = {
    denom: "ucosm",
    amount: "1234567",
  };

  const fee: IFee = {
    amount: [{ denom: "uatom", amount: "2000" }],
    gas: "180000",
  };

  return await sendStarCoinsInner(mnemonic, recipient, amount, fee);
};
