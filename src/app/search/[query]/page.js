// 'use client'
// import { GetMoviesBySearch } from "@/Utils";
// import { usePathname, useParams } from "next/navigation";
// import { useEffect, useState } from "react";


// export default function Search(){
//     const params = useParams();
//     useEffect(()=>{
//         const getBySearch = async()=>{
//             const res = await GetMoviesBySearch("movies", params.query)
//             console.log(res);
//         }
//         getBySearch();
//     }, [params]);
// }