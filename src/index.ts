import { config } from "dotenv";
config();

import { blockQuerier } from "./blockQuerier";
import { sendStarCoins } from "./transactionSender";

export { blockQuerier, sendStarCoins };
