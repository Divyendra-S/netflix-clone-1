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
import { Axios } from "@/helper/httpHelper";
import { ManageAccounts } from "@/components/manageAccounts";





export default function Tv(){
  const[loader, setLoader] = useState(false);

  const { LoggedIn, pageLoader, setMedia, media,setFavorites } = useContext(AppContext);
  const { data: session } = useSession();
  const getAllFavorites = async () => {
    try {
      const data = await Axios.get(
        `/api/favorites/getAllFavorite?id=${session?.user?.uid}&accountId=${LoggedIn?._id}`
      );

      if (data) {
        setFavorites(
          data.data.data.map((item) => ({
            ...item,
            addedToFavorites: true,
          }))
        );
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getAllMedia = async () => {
      setLoader(true);
      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      const allFavorites = await getAllFavorites();
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
            addedToFavorites: allFavorites && allFavorites?.data.data.length
            ? allFavorites?.data.data.map((fav) => fav.movieID).indexOf(medias.id) >
              -1
            : false,
          })),
        })),])
    };
    getAllMedia();
  }, [session, LoggedIn]);
  if (session === null) return <UnAuthPage />;
  if (loader) return <CircleLoader />;
  if (LoggedIn === null) return <ManageAccounts />;
  
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

