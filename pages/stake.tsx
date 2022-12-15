import {
  ThirdwebNftMedia,
  useAddress,
  useMetamask,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

const nftDropContractAddress = "0x5B29f2640120d65f11d200eBBea9e195dd67E776";
const tokenContractAddress = "0x06d40f5C48288a01d3cA250a56fDf01cF385C874";
const stakingContractAddress = "0xD8A40c49cc4CF88108c6fB4808669E08E90A3f5b";

const Stake: NextPage = () => {
  const [openMenu, setOpenMenu] = useState(false);

  // Wallet Connection Hooks
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  // Contract Hooks
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { contract, isLoading } = useContract(stakingContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  // Load Balance of Token
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  ///////////////////////////////////////////////////////////////////////////
  // Custom contract functions
  ///////////////////////////////////////////////////////////////////////////
  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!contract) return;

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, nftDropContract]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      console.log("Loaded claimable rewards", cr);
      setClaimableRewards(cr);
    }

    loadClaimableRewards();
  }, [address, contract]);

  ///////////////////////////////////////////////////////////////////////////
  // Write Functions
  ///////////////////////////////////////////////////////////////////////////
  async function stakeNft(id: string) {
    if (!address) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    // If not approved, request approval
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    const stake = await contract?.call("stake", id);
  }

  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-[10px]">
        <p className="w-fit m-auto text-2xl font-extrabold">Loading</p>
      </div>
    );
  }

  const route = useRouter();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="  px-[60px] pt-[20px] pb-[200px]"
    >
      <audio id="audioPlay" src="../aud/ost3.mp3" autoPlay={true}></audio>
      {!address ? (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 bg-[#0000008d] p-10 rounded-xl">
            <h1 className="font-extrabold text-center text-2xl ">
              Stake Your NFTs
            </h1>
            <button
              className="bg-cxgRed p-2 rounded-full w-fit h-fit  "
              onClick={connectWithMetamask}
              onMouseUp={() => {
                var audio = document.querySelector("#audioPlay");
                audio.volume = 0.25;
                audio.play();
              }}
              onTouchEnd={() => {
                var audio = document.querySelector("#audioPlay");
                audio.volume = 0.25;
                audio.play();
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`z-10 p-[10px] fixed bottom-0 left-0 right-0 bg-slate-900 w-full flex  md:flex-row flex-col gap-2 items-center justify-center duration-300 transition-all ease-in-out
            ${openMenu ? "translate-y-[100%]" : " translate-y-0"}
            `}
          >
            <div className="flex flex-col items-center border-2  border-cxgYellow2 rounded-lg  min-w-[300px] px-2">
              <h3 className="font-extrabold text-cxgYellow2">
                Claimable Rewards
              </h3>
              <p className="text-lg font-extrabold text-cxgYellow2">
                {!claimableRewards
                  ? "Loading..."
                  : ethers.utils.formatUnits(claimableRewards, 18)}{" "}
                {tokenBalance?.symbol}
              </p>
            </div>
            <button
              className={`w-fit px-4 py-1 rounded-full bg-cxgRed  text-white font-extrabold  hover:bg-cxgYellow2 a active:drop-shadow-[0px_0px_3px_#ffffff99]`}
              onClick={() => claimRewards()}
            >
              Claim Rewards
            </button>
            <div className="flex flex-col items-center  border-2  border-cxgRed rounded-lg  min-w-[300px] px-2">
              <h3 className="font-extrabold text-cxgRed">Current Balance</h3>
              <p className="text-lg font-extrabold text-cxgRed">
                {tokenBalance?.displayValue} {tokenBalance?.symbol}
              </p>
            </div>

            <BsArrowDownSquareFill
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
              className={`absolute -top-10 right-5 text-2xl transition-all duration-300 ease-in-out cursor-pointer
              ${openMenu ? " rotate-180" : ""}
              `}
            />
          </div>

          <div className=" min-h-screen">
            <h1 className="text-center font-extrabold text-2xl p-10">
              Unenrolled CXGNUS
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {ownedNfts?.map((nft) => (
                <div
                  className="w-[300px]  h-auto rounded-2xl border-4 border-slate-900 overflow-hidden bg-slate-900"
                  key={nft.metadata.id.toString()}
                >
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <div className="flex flex-col items-center gap-1 p-3">
                    <h3 className="text-xl font-extrabold">
                      {nft.metadata.name}
                    </h3>
                    <button
                      className={` w-full mx-auto bg-cxgRed rounded-full  hover:bg-cxgYellow2 a active:drop-shadow-[0px_0px_3px_#ffffff99]`}
                      onClick={() => stakeNft(nft.metadata.id)}
                    >
                      Stake
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" min-h-screen">
            <h2 className="text-center font-extrabold text-2xl p-10">
              Enrolled CXGNUS
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {stakedNfts?.map((nft) => (
                <div
                  className="w-[300px]  h-auto rounded-2xl border-4 border-slate-900 overflow-hidden bg-slate-900"
                  key={nft.metadata.id.toString()}
                >
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <div className="flex flex-col items-center gap-1 p-3">
                    <h3 className="text-xl font-extrabold">
                      {nft.metadata.name}
                    </h3>
                    <button
                      className={` w-full mx-auto bg-cxgRed rounded-full  hover:bg-cxgYellow2 a active:drop-shadow-[0px_0px_3px_#ffffff99]`}
                      onClick={() => withdraw(nft.metadata.id)}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </m.div>
  );
};

export default Stake;
