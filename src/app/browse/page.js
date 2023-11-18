"use client";
import { ManageAccounts } from "@/components/manageAccounts";
import { useSession } from "next-auth/react";
import UnAuthPage from "@/components/unauthPage";
import { AppContext } from "@/context";
import { useContext, useEffect } from "react";
import {
  getAllFavorites,
  GetPopularMedias,
  GetTopratedMedias,
  GetTrendingMedias,
} from "@/Utils";
import { CommonLayout } from "@/components/commonLayout";

export default function Browse(){
  const { LoggedIn, pageLoader, setMedia, media } = useContext(AppContext);
  const { data: session } = useSession();
  useEffect(() => {
    const getAllMedia = async () => {
      const getPopularMovies = await GetPopularMedias("movie");
      const getTrendingMovies = await GetTrendingMedias("movie");
      const getTopratedMovies = await GetTopratedMedias("movie");

      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      console.log("getPopularMovies", getTrendingMovies);
      const getFavorites = await getAllFavorites(session?.user?.uid, LoggedIn?._id);


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
  if (LoggedIn === null) return <ManageAccounts />;

  return <div className=" bg-[#141414] text-yellow-50 p-5"><CommonLayout mediaData={media}/></div>;
};
