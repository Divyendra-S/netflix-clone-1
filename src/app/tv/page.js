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
import { Navbar } from "@/components/navbar";
import { MediaItem } from "@/components/media-item";




export default function Tv(){
  const { LoggedIn, pageLoader, setMedia, media } = useContext(AppContext);
  const { data: session } = useSession();
  useEffect(() => {
    const getAllMedia = async () => {
      const getPopularTv = await GetPopularMedias("tv");
      const getTrendingTv = await GetTrendingMedias("tv");
      const getTopratedTv = await GetTopratedMedias("tv");
      const getFavorites = await getAllFavorites(session?.user?.uid, LoggedIn?._id);


      setMedia([
        ...[
          { title: "tv", Medias: getPopularTv },
          { title: "tv", Medias: getTrendingTv },
          { title: "tv", Medias: getTopratedTv },
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
  if (LoggedIn === null) return <ManageAccounts />;
  console.log(media?.[0]?.Medias, "mediaaaaaaaaa");

  return (
    <div className=" bg-[#141414] text-yellow-50 w-screen min-h-screen ">
      <Navbar />
       <div className="flex pt-[100px] relative flex-wrap justify-center  gap-3 items-center pl-7 ">
        {media?.map((item)=>(
          item?.Medias.map((medias) => (
            <MediaItem key={medias.id} media={medias} />
          ))))
        }
      </div> 
    </div>
  );
};

