import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { WalletProvider } from "@terra-money/wallet-kit";

import { networks } from "./config/networks.ts";
import App from "./App.tsx";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider defaultNetworks={networks}>
        <App />
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
