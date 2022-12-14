import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className=" flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 w-[500px] h-[300px] bg-[#000000cd] m-auto rounded-2xl p-4 transition-all duration-1000 ease-in-out">
      <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#d80b31] to-transparent mt-0 mb-auto mx-auto rounded-lg bg-[length:200%] animate-redLineAnim "></div>
      <h2 className=" font-extrabold text-2xl mx-auto w-fit py-4 ">
        Stake Your NFTs
      </h2>
      <div className="flex-1 flex flex-col justify-between">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
          eligendi ullam ea accusantium, vitae fugiat porro delectus pariatur
          accusamus voluptatem voluptatibus sit ipsam veritatis provident
          repudiandae quisquam numquam laudantium officia!
        </p>
        <button
          onClick={() => router.push(`/stake`)}
          className={`w-full font-extrabold bg-black rounded-md border-2 border-red-800 p-2 text-center hover:bg-red-800 active:bg-red-700 cursor-pointer 
                    `}
        >
          Start Staking
        </button>
      </div>
    </div>
  );
};

export default Home;
