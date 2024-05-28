import React, { useState } from "react";
import { WalletConnectAdapter } from "@tronweb3/tronwallet-adapter-walletconnect";
import { tronWeb } from "./tronweb";

const wallet = new WalletConnectAdapter({
  network: "Mainnet",
  options: {
    relayUrl: "wss://relay.walletconnect.com",
    // example walletconnect app project ID
    projectId: "6b7d9962bfaa51f0137b1d4de49c82cd",
    metadata: {
      name: "Tronweb wallet connect DApp",
      description: "Tronweb wallet connect DApp",
      url: "https://yourdapp-url.com",
      icons: ["https://yourdapp-url.com/icon.png"],
    },
  },
});

const App = () => {
  const [address, setAddress] = useState("");
  const tronWalletAddress = async () => {
    await wallet.connect();
    if (wallet.address) {
      tronWeb.setAddress(wallet.address);

      console.log("Wallet address: ", wallet.address);
      setAddress(wallet.address);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h3 className="text-center p-6 text-3xl">Tronweb Wallet Connect</h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:transition duration-300 ease-in-out"
          onClick={() => {
            try {
              tronWalletAddress();
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {" "}
          Tron Wallet Connect
        </button>
        {address && (
          <p className="text-center p-6">Connected Address: {address}</p>
        )}
      </div>
    </>
  );
};

export default App;
