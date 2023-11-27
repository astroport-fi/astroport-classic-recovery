export type NativeAssetInfo = {
  native_token: {
    denom: string;
  };
};

export type CW20AssetInfo = {
  token: {
    contract_addr: string;
  };
};

export type AssetInfo = CW20AssetInfo | NativeAssetInfo;

export type XYK = {
  xyk: object;
};

export type Stableswap = {
  stable: object;
};

export type PairType = XYK | Stableswap;

export type Pair = {
  asset_infos: [AssetInfo, AssetInfo];
  contract_addr: string;
  liquidity_token: string;
  pair_type: PairType;
};
