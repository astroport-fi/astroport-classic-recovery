import { useState } from "react";

import usePools from "../hooks/usePools";
import Pool from "./Pool";
import useCurrentWallet from "../hooks/useCurrentWallet";

export function Pools() {
  const [hideZeroBalances, setHideZeroBalances] = useState(true);
  const pools = usePools();
  const walletAddress = useCurrentWallet();

  return (
    <div>
      <h2>Pools</h2>
      {walletAddress && (
        <p>
          <button onClick={() => setHideZeroBalances(!hideZeroBalances)}>
            {hideZeroBalances ? "Show" : "Hide"} zero balances
          </button>
        </p>
      )}
      {pools.isLoading && <p>Loading...</p>}
      {pools.data && (
        <table border={1}>
          <thead>
            <tr>
              <th></th>
              <th>LP</th>
              <th>Staked LP</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pools.data.map((pool) => (
              <Pool
                key={pool.contract_addr}
                pool={pool}
                hideZeroBalances={hideZeroBalances}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
