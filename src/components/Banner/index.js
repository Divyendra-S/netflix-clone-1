"use client";

import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const baseUrl = "https://image.tmdb.org/t/p/original";

export const Banner = ({ medias }) => {
  const router = useRouter();
  const createRandomMedia =
    medias && medias.length
      ? medias[Math.floor(Math.random() * medias.length)]
      : null;
  console.log(createRandomMedia);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="ml-10 flex items-start w-[80%] mt-12"
    >
      <div className="flex flex-col  space-y-2 py-8  lg:h-[65vh] lg:justify-end  lg:pl-24 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.8 }}
          className="absolute top-0 left-0 h-[95vh] w-screen "
        >
          <Image
            src={`${baseUrl}/${
              createRandomMedia?.backdrop_path || createRandomMedia?.poster_path
            }`}
            fill={true}
            alt="Banner"
            sizes="(min-width: 66em) 33vw,
                   (min-width: 44em) 50vw,
                    100vw"
            priority={true}
            // alt="Banner"
            // layout="fill"
            // objectFit="cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5 }}
          className=" z-[999]  rounded-xl p-3 drop-shadow-lg max-w-[70%] "
        >
          <h1 className=" z-30  mt-2 text-7xl font-display mb-8">
            {createRandomMedia?.title ||
              createRandomMedia?.name ||
              createRandomMedia?.original_name}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5 }}
            className="z-[999] ml-2 flex items-center font-nova  gap-x-5 mt-6 mb-6"
          >
            <span>2023</span>
            <span className=" px-3 border-2 border-neutral-300 rounded ">
              18+
            </span>
            <span>IMDb 8.8/10</span>
            <span>1hr 25min</span>
          </motion.div>
          <div className=" ">
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.5 }}
              className="max-w-lg z-30 overflow-hidden text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl font-nova line-clamp-5 text-neutral-300"
            >
              {createRandomMedia?.overview}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5 }}
          className="z-[999]  "
        >
          <button
            onClick={() => {
              router.push(
                `/watch/${createRandomMedia?.type}/${createRandomMedia?.id}`
              );
            }}
            className="hover:opacity-75 ml-2 mt-6 bg-transparent flex p-1 font-semibold border-gradient-top-bottom rounded px-5"
          >
            {/* <AiFillPlayCircle className=" w-8 h-8 mr-4" /> */}
            <div className="mt-1 mb-1 bg-transparent text-white text-xl">
              Watch Trailer
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
