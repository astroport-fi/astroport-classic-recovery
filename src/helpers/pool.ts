import { Pair } from "../types";
import { getDenom, getSymbol } from "./token";

export function getPairName(pair: Pair) {
  const [firstAsset, secondAsset] = pair.asset_infos;
  const firstSymbol = getSymbol(getDenom(firstAsset));
  const secondSymbol = getSymbol(getDenom(secondAsset));
  return `${firstSymbol} / ${secondSymbol}`;
}
