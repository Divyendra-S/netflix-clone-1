"use client";
import { AppContext } from "@/context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Axios } from "@/helper/httpHelper";
import { useSession } from "next-auth/react";
import { getAllFavorites } from "@/Utils";
import { useParams } from "next/navigation";
import { MediaItem } from "@/components/media-item";
import { Navbar } from "@/components/navbar";

export default function MyList() {
  const { data: session } = useSession();
  const params = useParams();
  console.log(params)
  console.log("sessionssss", session);
  console.log(session?.user?.uid)
  const { LoggedIn, Favorites, setFavorites } = useContext(AppContext);
  const getAllFavorites = async () => {
    try {
      const data = await Axios.get(
        `/api/favorites/getAllFavorite?id=${params.id[0]}&accountId=${params.id[1]}`
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
    getAllFavorites();
  }, []);
  console.log("Favorites")
  console.log("favorites",Favorites)

  return (
    <div className=" bg-[#141414] text-yellow-50 w-screen h-screen ">
      <Navbar />
      <div className="flex mt-56 absolute z-[999] flex-wrap  gap-3 items-center pl-7 ">
        {Favorites.map((item,id) => (
            <MediaItem key={item._id} media={item} id={id}/>
        ))}
      </div>
    </div>
  );
}

