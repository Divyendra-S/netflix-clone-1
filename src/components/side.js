import React from "react";
import { motion } from "framer-motion";

export default function Side() {
  const styles = [
    {
      name: "Season 5",
    },
    {
      name: "Season 4",
    },
    {
      name: "Season 3",
    },
    {
      name: "Season 2",
    },
    {
      name: "Season 1",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className=" h-[65vh]   ml-5  text-white   relative gap-x-2  z-[999] "
    >
      <div className="bg-[#160404] absolute top-0 -z-20 left-[-150px]   h-[100vh] w-[31.5]  blur-[6rem]  sm:w-[200px] "></div>
      <div className="flex gap-y-16 flex-col absolute h-[100vh] items-start justify-center ">
        {styles.map((item, id) => (
          <p
            key={id}
            className=" ml-12 vertical-text font-sans cursor-pointer text-sm text-neutral-400 hover:text-white transition-all duration-200  hover:border-b-2 border-neutral-100"
          >
            {item.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
