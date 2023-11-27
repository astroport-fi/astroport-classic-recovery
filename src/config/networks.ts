export const DEFAULT_NETWORK = "columbus-5";

export const networks = {
  "columbus-5": {
    chainID: "columbus-5",
    prefix: "terra",
    lcd: "https://terra-classic-lcd.publicnode.com/",
    isClassic: true,
    gasAdjustment: 1.75,
    gasPrices: {
      uusd: 0.15,
    },
  },
};
