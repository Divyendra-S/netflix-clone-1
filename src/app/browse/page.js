"use client";

import { useSession } from "next-auth/react";
import UnAuthPage from "@/components/unauthPage";
import { AppContext } from "@/context";
import { useContext, useEffect,useState } from "react";
import {
  getAllFavorites,
  GetPopularMedias,
  GetTopratedMedias,
  GetTrendingMedias,
} from "@/Utils";
import { CommonLayout } from "@/components/commonLayout";
import CircleLoader from "@/components/Loader";

export default function Browse(){
  const[loader, setLoader] = useState(false);
  const { LoggedIn, pageLoader, setMedia, media } = useContext(AppContext);
  const { data: session } = useSession();
  useEffect(() => {
    const getAllMedia = async () => {
      setLoader(true);
      const getPopularMovies = await GetPopularMedias("movie");
      const getTrendingMovies = await GetTrendingMedias("movie");
      const getTopratedMovies = await GetTopratedMedias("movie");

      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      console.log("getPopularMovies", getTrendingMovies);
      setLoader(false);


      setMedia([
        ...[
          { title: "movie", Medias: getPopularMovies },
          { title: "movie", Medias: getTrendingMovies },
          { title: "movie", Medias: getTopratedMovies },
        ].map((item) => ({
          ...item,
          Medias: item.Medias.map((medias) => ({
            ...medias,
            type: "movies",
          })),
        })),
        ...[
          { title: "tv", Medias: getPopularTv },
          { title: "tv", Medias: getTrendingTv },
          { title: "tv", Medias: getTopratedTv },
        ].map((item) => ({
          ...item,
          Medias: item.Medias.map((medias) => ({
            ...medias,
            type: "tv",
          })),
        })),
      ]);
    };
    getAllMedia();
  }, []);
  if (session === null) return <UnAuthPage />;
  if (loader) return <CircleLoader />;
  

  return <div className=" bg-[#141414] text-yellow-50 "><CommonLayout mediaData={media}/></div>;
};
