"use client";
import { MediaRow } from "./media-row";
import { Banner } from "./Banner";
import { Navbar } from "./navbar";

export const CommonLayout = ({ mediaData }) => {
  return (
    <div>
      {console.log(mediaData)}
      <div>
        <Navbar />
        <Banner
          medias={mediaData && mediaData.length ? mediaData[0].Medias : []}
        />
        <div className=" mt-40">
        {mediaData.map((item) => (
          <MediaRow medias={item.Medias} title={item.title} key={item.Medias[0].id} />
        ))}
        </div>
      </div>
    </div>
  );
};
