import { useQuery } from "react-query";
import { LCDClient } from "@terra-money/feather.js";

import { networks } from "../config/networks";
import { isNative } from "../helpers/token";

export default function useBalance(
  denom: string | null,
  walletAddress: string | null
) {
  const client = new LCDClient(networks);

  return useQuery(
    ["balance", denom, walletAddress],
    async () => {
      if (!denom || !walletAddress) return;

      if (isNative(denom)) {
        const balances = await client.bank.spendableBalances(walletAddress);

        return balances[0].get(denom)?.amount.toString();
      } else {
        const balance = (await client.wasm.contractQuery(denom, {
          balance: { address: walletAddress },
        })) as { balance: string };

        return balance.balance;
      }
    },
    {
      enabled: !!walletAddress && !!denom,
    }
  );
}
