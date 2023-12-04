"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context";
import { Axios } from "@/helper/httpHelper";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Search from "./search";
import { AiOutlineSearch } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Nav from "@/app/nav/page";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  const [clicked, setClicked] = useState();
  const [isScrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountPopup, setAccountPopup] = useState(false);
  const { data: session } = useSession();
  const { LoggedIn, setLoggedIn, loader, setLoader } = useContext(AppContext);
  const router = useRouter();
  const pathName = usePathname();

  const options = [
    {
      title: "Home",
      id: 1,
      path: "/",
    },
    {
      title: "Movies",
      id: 2,
      path: "/movies",
    },
  ];
  const options2 = [
    {
      title: "Tv",
      id: 3,
      path: "/tv",
    },
    {
      title: "My list",
      id: 4,
      path: `/myList/${session?.user?.uid}/${LoggedIn?._id}`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className=" relative z-[999]"
    >
      <div className=" ">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`transition-all duration-200 left-0 top-0 mt-4 absolute z-20 h-[60px] flex items-center justify-between w-full`}
        >
          <div className="flex w-full justify-center  px-5">
            <motion.ul
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="flex gap-x-4 px-12"
            >
              {options.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "cursor-pointer hidden sm:block text-neutral-500 font-heebo  text-[16px] px-3 pt-1 transition duration-300 hover:scale-125 hover:text-white",
                    {
                      " text-white scale-105": item.path === pathName,
                    }
                  )}
                  onClick={() => {
                    router.push(`${item.path}`);
                    setClicked(pathName);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </motion.ul>
            <div className="bg-gradient-to-b top-[-18rem] -z-20 absolute  h-screen w-full from-black to-transparent"></div>
            {/* <div className="bg-[#160404] absolute top-[-5rem] -z-10  h-[12rem] w-[31.5]  blur-[6rem]  sm:w-[1000px] "></div> */}
            <div className="bg-[#fb2229]  absolute top-[-18rem] -z-10 right-[38rem] h-[31.5rem] w-[31.5] rounded-full blur-[14rem] opacity-80  sm:w-[20rem] "></div>
            <img
              src="https://rb.gy/ulxxee"
              width={120}
              height={120}
              alt="NETFLIX"
              className="cursor-pointer object-contain mx-4"
              onClick={() => router.push("/")}
            />

            <motion.ul
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="flex gap-x-4 px-12"
            >
              {options2.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    "cursor-pointer hidden sm:block text-neutral-500 font-heebo  text-[16px] px-3 pt-1 transition duration-300 hover:scale-125 hover:text-white",
                    {
                      " text-white scale-105": item.path === pathName,
                    }
                  )}
                  onClick={() => {
                    router.push(`${item.path}`);
                    setClicked(item.id);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </motion.ul>
          </div>
        </motion.header>

        <div
          onClick={() => {
            router.push("/nav");
          }}
          className=" absolute flex items-center mr-8 transition duration-300 hover:scale-150  mt-8 right-0 z-[999] cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
