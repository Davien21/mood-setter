import { ethers } from "ethers";
import { MoodContractAddress } from "./addresses";
import MoodContractABI from "./moodDiaryABI";

const MoodDiaryContract = async (signer) => {
  if (!window.ethereum) return false;
  return new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
};

export { MoodDiaryContract };
