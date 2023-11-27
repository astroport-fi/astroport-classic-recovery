import { MsgExecuteContract } from "@terra-money/feather.js";
import { useWallet } from "@terra-money/wallet-kit";

import { num } from "../lib/num";
import { formatTokenAmount } from "../helpers/balance";
import { getTokenPrecision } from "../helpers/token";
import { toBase64 } from "../helpers/encoding";
import { contracts } from "../config/contracts";
import { DEFAULT_NETWORK } from "../config/networks";
import useCurrentWallet from "../hooks/useCurrentWallet";
import useBalance from "../hooks/useBalance";

export default function Wallet() {
  const { availableWallets, connect, disconnect, post } = useWallet();
  const walletAddress = useCurrentWallet();
  const lunaBalance = useBalance("uluna", walletAddress);
  const usdBalance = useBalance("uusd", walletAddress);
  const astroBalance = useBalance(contracts.astro_token_address, walletAddress);
  const xastroBalance = useBalance(
    contracts.xastro_token_address,
    walletAddress
  );

  const onUnstake = () => {
    const xastroAmount = xastroBalance?.data || "0";
    if (!walletAddress || xastroAmount === "0") {
      return;
    }

    post({
      chainID: DEFAULT_NETWORK,
      msgs: [
        new MsgExecuteContract(walletAddress, contracts.xastro_token_address, {
          send: {
            contract: contracts.staking_address,
            amount: xastroAmount,
            msg: toBase64({
              leave: {},
            }),
          },
        }),
      ],
    }).then((response) => {
      console.log("onUnstake success", response);
      astroBalance.refetch();
      xastroBalance.refetch();
    });
  };

  return (
    <>
      {!walletAddress &&
        availableWallets.map(({ id, icon, name, isInstalled }) => (
          <button key={id} disabled={!isInstalled} onClick={() => connect(id)}>
            <img height={30} src={icon} /> Connect {name}
          </button>
        ))}
      {walletAddress && (
        <>
          <p>Wallet address: {walletAddress}</p>
          <p>
            LUNAC balance:{" "}
            {formatTokenAmount(
              lunaBalance?.data || "0",
              getTokenPrecision("uuluna")
            )}
          </p>
          <p>
            USTC balance:{" "}
            {formatTokenAmount(
              usdBalance?.data || "0",
              getTokenPrecision("uusd")
            )}
          </p>
          <p>
            ASTROC balance:{" "}
            {formatTokenAmount(
              astroBalance?.data || "0",
              getTokenPrecision(contracts.astro_token_address)
            )}
          </p>
          <p>
            xASTROC balance:{" "}
            {formatTokenAmount(
              xastroBalance?.data || "0",
              getTokenPrecision(contracts.xastro_token_address)
            )}
            {num(xastroBalance?.data || "0").gt(0) && (
              <button onClick={onUnstake}>Unstake</button>
            )}
          </p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      )}
    </>
  );
}
