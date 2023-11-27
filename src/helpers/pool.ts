import { Pair } from "../types";
import { getSymbol } from "./token";

export function getPairName(pair: Pair) {
  const [firstAsset, secondAsset] = pair.asset_infos;
  const firstSymbol = getSymbol(firstAsset);
  const secondSymbol = getSymbol(secondAsset);
  return `${firstSymbol} / ${secondSymbol}`;
}
