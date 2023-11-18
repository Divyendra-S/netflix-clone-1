'use client'
import { GetPopularMoviesById } from "@/Utils";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";


export default function Watch () {
    const [key, setKey] = useState("XuDwndGaCFo");
    const params = useParams();

    

    return (
        <div>
             <ReactPlayer
        url={`https://www.youtube.com/watch?v=${key}`}
        width={"100%"}
        height={"100%"}
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
        controls
      />
        </div>
    )
}