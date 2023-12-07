"use client";
import { ManageAccounts } from "@/components/manageAccounts";
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
import { CommonLayout } from "@/components/commonLayout";
import CircleLoader from "@/components/Loader";
import { Axios } from "@/helper/httpHelper";

export default function Browse() {
  const [loader, setLoader] = useState(false);
  const { LoggedIn, pageLoader, setMedia, media, favorites, setFavorites } =
    useContext(AppContext);
  const { data: session } = useSession();
  console.log("ssssssssssssssssssssssssss",session)
  const uid = session?.user?.uid;
  const getAllFavorites = async () => {
    console.log(session?.user?.uid)
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

      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      const allFavorites = await getAllFavorites();
      console.log(allFavorites?.data.data, "alllllll");
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
            addedToFavorites: allFavorites && allFavorites?.data.data.length
            ? allFavorites?.data.data.map((fav) => fav.movieID).indexOf(medias.id) >
              -1
            : false,
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
            addedToFavorites: allFavorites && allFavorites?.data.data.length
            ? allFavorites?.data.data.map((fav) => fav.movieID).indexOf(medias.id) >
              -1
            : false,
          })),
        })),
      ]);
    };
    getAllMedia();
  }, [session,LoggedIn]);
  if (session === null) return <UnAuthPage />;
  if (loader) return <CircleLoader />;
  if (LoggedIn === null) return <ManageAccounts />;

  return (
    <div className=" bg-[#141414] text-yellow-50 ">
      <CommonLayout mediaData={media} />
    </div>
  );
}
