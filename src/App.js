import { useState } from "react";
import "./App.css";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import Swal from "sweetalert2";
function App() {
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    try {
      let connection = new Connection("https://api.devnet.solana.com");

      let PublicKeyObj = new PublicKey(text);
      console.log("errir");
      console.log(connection, PublicKeyObj);
      const txId = await connection.requestAirdrop(
        PublicKeyObj,
        LAMPORTS_PER_SOL
      );
      Swal.fire(
        "SOl Transfered",
        `1 Sol has been Tranfered to you wallet!`,
        "success"
      );
      console.log(`Airdrop Transaction Id: ${txId}`);
      console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
      setText("");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
      console.log("err", err.message);
    }
  };
  return (
    <div className="container">
      <h1 style={{ textAlign: "Center" }}>Solana AirDrop </h1>
      <input
        className="inputBox"
        placeholder="Enter Your Wallet Address"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button className="btn" onClick={handleSubmit}>
        Airdrop
      </button>
    </div>
  );
}

export default App;
