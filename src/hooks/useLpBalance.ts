import { useQuery } from "react-query";
import { LCDClient } from "@terra-money/feather.js";

import { networks } from "../config/networks";
import { contracts } from "../config/contracts";

export default function useLpBalance(
  poolAddress: string | null,
  lpAddress: string | null,
  walletAddress: string | null
) {
  const client = new LCDClient(networks);

  return useQuery(
    ["lpBalance", poolAddress, lpAddress, walletAddress],
    async () => {
      if (!poolAddress || !lpAddress || !walletAddress) return;
      const [lpBalanceResponse, stakeLpBalanceResponse] = await Promise.all([
        client.wasm.contractQuery(lpAddress, {
          balance: { address: walletAddress },
        }) as Promise<{ balance: string }>,
        client.wasm.contractQuery(contracts.generator_address, {
          deposit: {
            lp_token: lpAddress,
            user: walletAddress,
          },
        }) as Promise<string>,
      ]);

      return {
        lpBalance: lpBalanceResponse.balance || "0",
        stakeLpBalance: stakeLpBalanceResponse || "0",
      };
    },
    {
      enabled: !!walletAddress && !!poolAddress && !!lpAddress,
    }
  );
}
