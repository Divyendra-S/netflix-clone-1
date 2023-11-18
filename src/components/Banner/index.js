"use client";

import Image from "next/image";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
const baseUrl = "https://image.tmdb.org/t/p/original";

export const Banner = ({ medias }) => {
  const router = useRouter();
  const createRandomMedia =
    medias && medias.length
      ? medias[Math.floor(Math.random() * medias.length)]
      : null;
  console.log(createRandomMedia);
  return (
    <div>
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
        <div className="absolute top-0 left-0 h-[95vh] w-screen ">
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

          <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 " />
        </div>
        <div className=" z-30 rounded-xl p-3 drop-shadow-lg w-1/2 bg-slate-900 bg-opacity-25">
          <h1 className=" z-30 font-bold text-7xl">
            {createRandomMedia?.title ||
              createRandomMedia?.name ||
              createRandomMedia?.original_name}
          </h1>
          <p className="max-w-xs z-30 text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
            {createRandomMedia?.overview}
          </p>
        </div>
        <div className="z-30">
          <button
            onClick={() => {
              router.push(`/watch/${createRandomMedia?.type}/${createRandomMedia?.id}`);
            }}
            className="hover:opacity-75 bg-white text-black flex p-1 font-semibold rounded px-5"
          >
            <AiFillPlayCircle className=" w-8 h-8 mr-4" />
            <div className="mt-1 text-xl">Play</div>
          </button>
        </div>
      </div>
    </div>
  );
};
