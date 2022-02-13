import { useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { MoodDiaryContract } from "../contracts";

function IndexPage() {
  const [currentMood, setCurrentMood] = useState("");

  const getMood = async () => {
    try {
      if (!window.ethereum) return false;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "ropsten"
      );

      const signer = provider.getSigner(accounts[0]);
      const contract = await MoodDiaryContract(signer);
      const mood = await contract.getMood();
      console.log({ mood });
    } catch (error) {
      console.log(error);
    }
  };
  const setMood = async () => {
    try {
      if (!window.ethereum) return false;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "ropsten"
      );

      const signer = provider.getSigner(accounts[0]);
      const contract = await MoodDiaryContract(signer);
      await contract.setMood(currentMood);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>This is my dApp!</h1>
        <p>Here we can set or get the mood:</p>
        <label htmlFor="mood">Input Mood:</label> <br />
        <input
          type="text"
          id="mood"
          onChange={(e) => setCurrentMood(e.target.value)}
        />
      </div>
      <div>
        <div>
          <button onClick={getMood}>get Mood</button>
        </div>
        <div>
          <button onClick={setMood}>set Mood</button>
        </div>
      </div>
    </>
  );
}

export default IndexPage;
