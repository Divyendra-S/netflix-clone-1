"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AppContext } from "@/context";
import { ManageAccounts } from "@/components/manageAccounts";
import UnAuthPage from "@/components/unauthPage";

export default function Nav() {
  const { LoggedIn, setLoggedIn } = useContext(AppContext);
  const router = useRouter();
  const { data: session } = useSession();
  const navigation = [
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
    {
      title: "Tv Shows",
      id: 3,
      path: "/tv",
    },
    {
      title: "My list",
      id: 4,
      path: `/myList/${session?.user?.uid}/${LoggedIn?._id}`,
    },
    {
      title: "Settings",
      id: 5,
      path: `/tv`,
    },
  ];
  if (session === null) return <UnAuthPage />;
  if (LoggedIn === null) return <ManageAccounts />;
  return (
    <div className=" bg-black min-h-screen min-w-full relative  z-[999]">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className=" flex items-center justify-center w-full pt-8"
      >
        <img
          src="https://rb.gy/ulxxee"
          width={120}
          height={120}
          alt="NETFLIX"
          className="cursor-pointer object-contain mx-4"
          onClick={() => router.push("/")}
        />
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col w-full  text-white items-center  mt-36 gap-y-16 text-5xl"
      >
        {navigation.map((item, id) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: id * 0.65 }}
            key={item.id}
          >
            <Link
              className="transition duration-150 hover:scale-110 hover:text-red-600 cursor-pointer"
              href={item.path}
            >
              {item.title}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.3 }}
        >
          <div
            onClick={() => {
              signOut("github");
            }}
            className="transition duration-150 hover:scale-110 hover:text-red-600 cursor-pointer"
          >
            <Link href={"/"} className="">
              Sign Out
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.5 }}
        >
          <div
            onClick={() => {
              setLoggedIn(null);
              sessionStorage.removeItem("LoggedIn");
            }}
            className="transition duration-150 hover:scale-110 hover:text-red-600 cursor-pointer"
          >
            <div className="">Accounts</div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="bg-[#fb2229]  absolute top-[-22rem] -z-10 right-[42rem] h-[31.5rem] w-[31.5] rounded-full blur-[14rem] opacity-65  sm:w-[20rem] "
      ></motion.div>
      <div>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
