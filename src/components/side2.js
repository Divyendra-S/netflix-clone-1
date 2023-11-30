'use client'
import { IoLogoInstagram } from "react-icons/io";
import { TfiFacebook } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";


export default function Side2() {
    const styles = [
      {
        name: <IoLogoInstagram  className=" w-6 h-6" />,
      },
      {
        name: <TfiFacebook  className=" w-6 h-6" />,
      },
      {
        name: <FaTwitter  className=" w-6 h-6" />,
      },
      {
        name: <FaYoutube  className=" w-6 h-6" />,
      },
    ];
    return (
      <motion.div initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }} className=" h-[65vh]    right-0 ml-48  text-white   relative   z-[999] ">
          <div className="bg-[#160404] absolute top-0 -z-10 right-0   h-[100vh] w-[31.5]  blur-[6rem]  sm:w-[50px] "></div>
          <div className="flex gap-y-10 flex-col absolute h-[100vh] -z-10 items-start justify-center">
        {styles.map((item , id)=>(
          <div key={id} className="  font-roboto cursor-pointer text-sm text-neutral-400 hover:text-white transition-all duration-200 hover:scale-110  "><p className=" bg-neutral-800 rounded-full p-2">{item.name}</p></div>
        ))}
        </div>
      </motion.div>
    );
  }
  