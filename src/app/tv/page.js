"use client";

import { useSession } from "next-auth/react";
import UnAuthPage from "@/components/unauthPage";
import { AppContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import {
  getAllFavorites,
  GetPopularMedias,
  GetTopratedMedias,
  GetTrendingMedias,
} from "@/Utils";
import { Navbar } from "@/components/navbar";
import { MediaItem } from "@/components/media-item";
import CircleLoader from "@/components/Loader";
import { motion } from "framer-motion";





export default function Tv(){
  const[loader, setLoader] = useState(false);

  const {  pageLoader, setMedia, media } = useContext(AppContext);
  const { data: session } = useSession();
  useEffect(() => {
    const getAllMedia = async () => {
      setLoader(true);
      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      //const getFavorites = await getAllFavorites(session?.user?.uid, LoggedIn?._id);
      setLoader(false);

      setMedia([
        ...[
          { title: "tv", Medias: getPopularTv },
        ].map((item) => ({
          ...item,
          Medias: item.Medias.map((medias) => ({
            ...medias,
            type: "movies",
          })),
        })),])
    };
    getAllMedia();
  }, []);
  if (session === null) return <UnAuthPage />;
  if (loader) return <CircleLoader />;
  
  console.log(media?.[0]?.Medias, "mediaaaaaaaaa");

  return (
    <div className=" bg-black relative text-yellow-50 top-0  text-center sm:text-left  w-screen min-h-screen ">
      <Navbar />
       <div className="flex pt-[100px] absolute flex-wrap mr-6 sm:mr-0 justify-center sm:justify-start z-[999]  gap-3  pl-7 mt-14">
        {media?.map((item)=>(
          item?.Medias.map((medias, id) => (
            <MediaItem key={medias.id} media={medias} id={id}/>
          ))))
        }
      </div> 
    </div>
  );
};

