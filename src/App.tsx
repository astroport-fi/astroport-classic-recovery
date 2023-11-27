import { Pools } from "./components/Pools";
import Wallet from "./components/Wallet";

export default function App() {
  return (
    <main>
      <h1>Astroport Classic</h1>
      <Wallet />
      <hr />
      <Pools />
    </main>
  );
}
