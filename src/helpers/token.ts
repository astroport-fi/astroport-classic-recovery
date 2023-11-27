import { TOKENS } from "../assets/tokens";
import { AssetInfo } from "../types";

export const DEFAULT_PRECISION = 6;

export function isNative(denom: string) {
  return !denom.startsWith("terra");
}

export function getDenom(assetInfo: AssetInfo) {
  return "native_token" in assetInfo
    ? assetInfo.native_token.denom
    : assetInfo.token.contract_addr;
}

export function getSymbol(denom: string) {
  const token = TOKENS[denom];
  return token?.symbol || denom;
}

export function getIcon(denom: string) {
  const token = TOKENS[denom];
  return token?.icon || "";
}

export function getTokenPrecision(denom: string) {
  const token = TOKENS[denom];
  return token?.decimals || DEFAULT_PRECISION;
}
