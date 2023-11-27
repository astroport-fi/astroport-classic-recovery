import { useConnectedWallet } from "@terra-money/wallet-kit";

export default function useCurrentWallet() {
  const wallet = useConnectedWallet();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // const address: string | null = wallet?.address;
  const address = "terra1rhfkcvyq5ut7r7yt7hp9m4xw36fj790399h7xh";

  if (!wallet) return null;

  return address;
}
