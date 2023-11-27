import { BigNumber } from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 50,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

export function num(value: number | string): BigNumber {
  return new BigNumber(value);
}

export * from "bignumber.js";
