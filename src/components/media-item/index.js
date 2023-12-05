"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Axios } from "@/helper/httpHelper";
import { useSession } from "next-auth/react";
import { AppContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  ChevronDownIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { IoTrashBinOutline } from "react-icons/io5";
import CircleLoader from "../Loader";
//import mission from '../../../public/mission.jpg' /Users/divyendra/Documents/netflix-clone1/my-net/public/mission.jpg
const baseUrl = "https://image.tmdb.org/t/p/w500";

export const MediaItem = ({ media, id }) => {
  const [Loader,setLoader] = useState(false);
  const { LoggedIn, setFavorites } = useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();
  const getAllFavorites = async (id, accountID) => {
    try {
      setLoader(true);
      const data = await Axios.get(
        `/api/favorites/getAllFavorite?id=${id}&accountId=${accountID}`
      );

      if (data) {
        setFavorites(
          data.data.data.map((item) => ({
            ...item,
            addedToFavorites: true,
            delete: true,
          }))
        );
      }
      setLoader(false);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const addToFavorites = async (item) => {
    const { backdrop_path, poster_path, id, type } = item;
    try {
      const res = await Axios.post(`/api/favorites/add-favorite`, {
        backdrop_path,
        poster_path,
        movieID: id,
        type,
        uid: session?.user?.uid,
        accountID: LoggedIn?._id,
      });

      // getAllFavorites(session?.user?.uid, LoggedIn?._id);
    } catch (err) {
      console.log(err);
    }
  };
  async function updateFavorites() {
    const res = await getAllFavorites(session?.user?.uid, LoggedIn?._id);
    if (res)
      setFavorites(
        res.map((item) => ({
          ...item,
          addedToFavorites: true,
        }))
      );
  }
  async function handleRemoveFavorites(item) {
    const data = await Axios.delete(
      `/api/favorites/remove-favorite?id=${item._id}`
    );

    getAllFavorites(session?.user?.uid, LoggedIn?._id);
    updateFavorites();
  }
  useEffect(()=>{
    getAllFavorites(session?.user?.uid, LoggedIn?._id);
    updateFavorites();
  },[session,LoggedIn])

  if (session === null) return <UnAuthPage />;
  if (Loader) return <CircleLoader />;
  if (LoggedIn === null) return <ManageAccounts />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: id * 0.5 }}
      className=" relative group flex items-end justify-center   h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]"
    >
      <div>
        <Image
          src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
          fill={true}
          alt="Media"
          sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
          className="rounded sm w-7 md:rounded hover:rounded-sm"
          onClick={() => {
            router.push(`/watch/${media?.type}/${media?.id}`);
          }}
        />
      </div>
      <button
        onClick={() => {
          addToFavorites(media);
          updateFavorites();
          getAllFavorites(session?.user?.uid, LoggedIn?._id);
        }}
        className={`opacity-0 cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition group-hover:opacity-90 border-white   bg-black  text-black`}
      >
        {media?.addedToFavorites ? (
          <CheckIcon color="#ffffff" className="h-7 w-7" />
        ) : (
          <PlusIcon color="#ffffff" className="h-7 w-7" />
        )}
      </button>
      {media?.delete &&<button
        onClick={() => {
          handleRemoveFavorites(media);
          updateFavorites();
        }}
        className={`opacity-0 cursor-pointer border flex p-2 items-center gap-x-2 rounded-full  text-sm font-semibold transition group-hover:opacity-90 border-white   bg-black  text-black`}
      >
        {media?.delete && <IoTrashBinOutline color="#ffffff" className="h-7 w-7" />}
      </button>}
    </motion.div>
  );
};
// {`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
