"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context";
import { Axios } from "@/helper/httpHelper";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Search from "./search";
import { AiOutlineSearch } from "react-icons/ai";
import AccountPopUp from "./AccountPop";
import Image from "next/image";

export const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountPopup, setAccountPopup] = useState(false);
  const { data: session } = useSession();
  const { Account, setAccount, LoggedIn, setLoggedIn, loader, setLoader } =
    useContext(AppContext);
  const router = useRouter();
  const pathName = usePathname();
  const options = [
    {
      title: "Home",
      id: "home",
      path: "/",
    },
    {
      title: "Movies",
      id: "movies",
      path: "/movies",
    },
    {
      title: "Tv",
      id: "tv",
      path: "/tv",
    },
    {
      title: "My list",
      id: "myList",
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

  useEffect(()=> {
    const getAllAccounts = async () => {
      try {
        const res = await Axios.get(
          `/api/getAllAccounts?id=${session?.user?.uid}`
        );
        if (res.data.sucess) {
          setAccount(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllAccounts();
  },[session])
  
  return (
    <div className=" relative z-[999]">
      <header
        className={`hover:bg-[#141414] ${
          isScrolled ? "bg-[#141414]" : "bg-[#141414] bg-opacity-25"
        }  transition-all duration-200 left-0 top-0 fixed h-[60px] flex items-center justify-between w-full`}
      >
        <div className="flex px-5">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            alt="NETFLIX"
            className="cursor-pointer object-contain"
            onClick={() => router.push("/")}
          />
          <ul className="flex px-8">
            {options.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer text-[20px] px-2 pt-1 text-[#ffffff]"
                onClick={() => router.push(`${item.path}`)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className=" flex mr-6">
          <div>
            {showSearch ? (
              <Search
                pathName={pathName}
                router={router}
                setLoader={setLoader}
                setShowSearch={setShowSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            ) : (
              <AiOutlineSearch
                onClick={() => setShowSearch(true)}
                className=" mr-5 sm:inline w-6 h-6 cursor-pointer"
              />
            )}
          </div>
          <div
            className=" mr-10  flex cursor-pointer "
            onClick={() => {
              setAccountPopup(!accountPopup);
            }}
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Current Profile"
              className="max-w-[30px] rounded min-w-[20px] mr-2 max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p className=" mt-1"> {LoggedIn && LoggedIn.name} </p>
          </div>
        </div>
      </header>
      {accountPopup && (
        <AccountPopUp
          signOut={signOut}
          Account={Account}
          setAccountPopup={setAccountPopup}
          LoggedIn={LoggedIn}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
  );
};
