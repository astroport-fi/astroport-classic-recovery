import { num } from "../lib/num";

export function formatTokenAmount(amount: string, precision: number) {
  return num(amount)
    .div(10 ** precision)
    .toString();
}
