"use client";
import { useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default function Search({
  pathName,
  router,
  setShowSearch,
  searchQuery,
  setSearchQuery,
  setLoader,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    try {
      inputRef.current.focus();
    } catch (error) {
      console.log(error) 
    }
  }, [])
  const handleSubmit = (e) => {
    if (e.key === "Enter" && searchQuery && searchQuery.trim() !== "") {
      if (pathName.includes("/search")) {
        router.replace(`/search/${searchQuery}`);
      } else {
        router.push(`/search/${searchQuery}`);
      }
    }
  };
  return (
    <div className=" flex">
      <div>
        <input
          ref={inputRef}
          name="search"
          placeholder="Search movies,  shows and tv"
          onKeyUp={handleSubmit}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="  w-[240px] p-1 outline-none bg-transparent placeholder:text-[14px] font-medium transition-all duration-200 border-b "
        />
      </div>
      <button className="px-2.5 mr-16">
        <AiOutlineSearch
          onClick={() => setShowSearch(false)}
          className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer"
        />
      </button>
    </div>
  );
}
