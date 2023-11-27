import { MsgExecuteContract } from "@terra-money/feather.js";
import { useWallet } from "@terra-money/wallet-kit";

import { Pair } from "../types";
import { getPairName } from "../helpers/pool";
import { DEFAULT_PRECISION, getDenom, getIcon } from "../helpers/token";
import { formatTokenAmount } from "../helpers/balance";
import useLpBalance from "../hooks/useLpBalance";
import useCurrentWallet from "../hooks/useCurrentWallet";
import { DEFAULT_NETWORK } from "../config/networks";
import { num } from "../lib/num";
import { toBase64 } from "../helpers/encoding";
import { contracts } from "../config/contracts";

export default function Pool({
  pool,
  hideZeroBalances = false,
}: {
  pool: Pair;
  hideZeroBalances?: boolean;
}) {
  const { post } = useWallet();
  const walletAddress = useCurrentWallet();
  const lpBalances = useLpBalance(
    pool.contract_addr,
    pool.liquidity_token,
    walletAddress
  );
  const lpBalance = lpBalances.data?.lpBalance || "0";
  const stakeLpBalance = lpBalances.data?.stakeLpBalance || "0";

  const onWithdraw = () => {
    if (!walletAddress || lpBalance === "0") {
      return;
    }

    post({
      chainID: DEFAULT_NETWORK,
      msgs: [
        new MsgExecuteContract(walletAddress, pool.liquidity_token, {
          send: {
            contract: pool.contract_addr,
            amount: lpBalance,
            msg: toBase64({
              withdraw_liquidity: {},
            }),
          },
        }),
      ],
    }).then((response) => {
      console.log("onWithdraw success", response);
      lpBalances.refetch();
    });
  };

  const onUnstake = () => {
    if (!walletAddress || stakeLpBalance === "0") {
      return;
    }

    post({
      chainID: DEFAULT_NETWORK,
      msgs: [
        new MsgExecuteContract(walletAddress, contracts.generator_address, {
          withdraw: {
            lp_token: pool.liquidity_token,
            amount: stakeLpBalance,
          },
        }),
      ],
    }).then((response) => {
      console.log("onUnstake success", response);
      lpBalances.refetch();
    });
  };

  if (
    hideZeroBalances &&
    lpBalances.isFetched &&
    lpBalance === "0" &&
    stakeLpBalance === "0"
  ) {
    return null;
  }

  return (
    <tr>
      <td>
        <img height={20} src={getIcon(getDenom(pool.asset_infos[0]))} />
        <img height={20} src={getIcon(getDenom(pool.asset_infos[1]))} />
        <a
          href={`https://finder.terra-classic.hexxagon.io/mainnet/address/${pool.contract_addr}`}
          target="_blank"
        >
          {getPairName(pool)}
        </a>
      </td>
      <td>{formatTokenAmount(lpBalance, DEFAULT_PRECISION)}</td>
      <td>{formatTokenAmount(stakeLpBalance, DEFAULT_PRECISION)}</td>
      <td>
        {num(lpBalance).gt(0) && <button onClick={onWithdraw}>Withdraw</button>}
        {num(stakeLpBalance).gt(0) && (
          <button onClick={onUnstake}>Unstake</button>
        )}
      </td>
    </tr>
  );
}
