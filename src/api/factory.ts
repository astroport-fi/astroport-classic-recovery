import { LCDClient } from "@terra-money/feather.js";

import { Pair } from "../types";
import { contracts } from "../config/contracts";

const MAX_LIMIT = 30;

export async function getPairs(
  client: LCDClient,
  start_after: unknown
): Promise<{ pairs: Pair[] }> {
  return await client.wasm.contractQuery(contracts.factory_address, {
    pairs: {
      limit: MAX_LIMIT,
      start_after,
    },
  });
}

export async function getAllPairs(client: LCDClient) {
  const pairs: Pair[] = [];
  let start_after = undefined;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const result = await getPairs(client, start_after);
    pairs.push(...result.pairs);
    if (result.pairs.length < MAX_LIMIT) {
      break;
    }
    start_after = result.pairs[result.pairs.length - 1].asset_infos;
  }

  return pairs;
}
