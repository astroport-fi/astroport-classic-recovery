import { useConnectedWallet } from "@terra-money/wallet-kit";

export default function useCurrentWallet() {
  const wallet = useConnectedWallet();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const address: string | null = wallet?.address;

  if (!wallet) return null;

  return address;
}
