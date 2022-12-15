import type { NextPage } from "next";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-50%", opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-[10px]"
    >
      <div className=" flex flex-col items-center justify-center  max-w-[500px] min-h-[400px] bg-[#000000cd] rounded-2xl p-4 transition-all duration-1000 ease-in-out">
        <div className="h-3 w-full  to-transparent mt-0 mb-auto mx-auto rounded-lg bg-[length:200%] animate-redLineAnim bg-gradient-to-r from-transparent via-[#d80b31]"></div>
        <h2 className=" font-extrabold text-[30px] mx-auto w-fit py-4 text-center">
          CXG ACADEMY
        </h2>
        <h3 className="text-center">WELCOME TO CXG ACADEMY YOUNG HEROES</h3>
        <br />
        <div className="flex-1 flex flex-col justify-between">
          <p>
            This is only the start of your journey in defending humanity from
            the other side. You will undergo training and learn everything in
            order to become a fully pledge hero of society.
          </p>
          <br />
          <p className=" italic text-center">
            NOTE : 1 CXGNUS NFT can claim 1 CXG$ per day.
          </p>
          <br />
          <button
            onClick={() => {
              router.push(`/stake`);
            }}
            className={`w-full font-extrabold bg-black rounded-md border-2 border-red-800 p-2 text-center hover:bg-red-800 active:bg-red-700 cursor-pointer 
                    `}
          >
            ENROLL
          </button>
        </div>
      </div>
    </m.div>
  );
};

export default Home;
