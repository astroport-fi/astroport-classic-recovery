import { useQuery } from "react-query";
import { LCDClient } from "@terra-money/feather.js";

import { networks } from "../config/networks";
import { getAllPairs } from "../api/factory";

export default function usePools() {
  const client = new LCDClient(networks);

  return useQuery(
    "pools",
    async () => {
      return await getAllPairs(client);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    }
  );
}
