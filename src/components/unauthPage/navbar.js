"use client"
import Google from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";


export default function Navbar() {
  return (
    <motion.div initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9 }} className="relative z-[999]">
      <header className=" fixed flex justify-between w-screen px-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="netflix"
          width={120}
          height={120}
          className="w-28 sm:w-36 lg:w-52 ml-4 sm:ml-8 pt-4"
        />
        <button onClick={()=>{signIn("google")}} className=" bg-red-600 h-8 mt-5 p-2 text-center flex items-center rounded">Sign In</button>
      </header>
    </motion.div>
  );
}
