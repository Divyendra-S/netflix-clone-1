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
import { Navbar } from "@/components/navbar";
import { MediaItem } from "@/components/media-item";
import { motion } from "framer-motion";
import CircleLoader from "@/components/Loader";
import { ManageAccounts } from "@/components/manageAccounts";
import { Axios } from "@/helper/httpHelper";

export default function Movies() {
  const[loader, setLoader] = useState(false);

  const { LoggedIn, setMedia, media } = useContext(AppContext);
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
      const getPopularMovies = await GetPopularMedias("movie");
      const getTrendingMovies = await GetTrendingMedias("movie");
      const getTopratedMovies = await GetTopratedMedias("movie");
      const allFavorites = await getAllFavorites();
      console.log("getPopularMovies", getTrendingMovies);
      setLoader(false);

      setMedia([
        ...[{ title: "movie", Medias: getPopularMovies },].map((item) => ({
          ...item,
          Medias: item.Medias.map((medias) => ({
            ...medias,
            type: "movies",
            addedToFavorites: allFavorites && allFavorites?.data.data.length
            ? allFavorites?.data.data.map((fav) => fav.movieID).indexOf(medias.id) >
              -1
            : false,
          })),
        })),
      ]);
    };
    getAllMedia();
  }, [session, LoggedIn]);
  if (session === null) return <UnAuthPage />;
  if (LoggedIn === null) return <ManageAccounts />;
  if (loader) return <CircleLoader />;
  console.log(media?.[0]?.Medias, "mediaaaaaaaaa");

  return (
    <div className=" bg-black relative text-yellow-50 w-screen min-h-screen ">
      <Navbar />
      <div
        className="flex pt-[100px] absolute flex-wrap z-[999] mr-6 sm:mr-0 justify-center sm:justify-start  gap-3  ml-7 mt-14 "
      >
        {media?.map((item, id) =>(
          item?.Medias.map((medias,id) => (
            <MediaItem key={medias.id} media={medias} id={id} />
          ))
        ))}
      </div>
    </div>
  );
}
