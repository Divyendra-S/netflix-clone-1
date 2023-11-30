'use client'
import Image from "next/image";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";


export default function Banner() {
  return (
    <motion.div initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    transition={{ duration: 1.5 }} className="flex flex-col h-[95vh] text-white items-center justify-center ">
    <div className="absolute h-[95vh] w-screen bg-[#141414] ">
      <div className="relative top-0 left-0 w-full h-[95vh] bg-black opacity-70 z-10"></div>

      <Image
        src={
          "https://assets.nflxext.com/ffe/siteui/vlv3/84526d58-475e-4e6f-9c81-d2d78ddce803/e3b08071-f218-4dab-99a2-80315f0922cd/LK-en-20221228-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        }
        fill={true}
        alt="Banner"
        sizes="(min-width: 66em) 33vw,(min-width: 44em) 50vw,
                    100vw"
        priority={true}
      />
    </div>
    <div className="text-6xl z-50 flex items-center text-center justify-center"> Unlimited movies, TV</div>
    <div className="text-5xl z-50 flex items-center text-center justify-center"> shows, and more..</div>
    <button onClick={()=>{signIn("google")}} className=" z-50 bg-red-600 justify-center  mt-5 p-4 py-4 h-14 text-center w-48 flex items-center rounded">Sign In Get Started..</button>
    </motion.div>
  );
}
