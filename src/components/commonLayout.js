"use client";
import { MediaRow } from "./media-row";
import { Banner } from "./Banner";
import { Navbar } from "./navbar";
import Side from "./side";
import Side2 from "./side2";

export const CommonLayout = ({ mediaData }) => {
  return (
    <div className="">
      {console.log(mediaData)}
      <div>
        <Navbar />
        <div className="flex  relative left-0 p-0 right-0 max-w-full">
          <div className=" hidden sm:block">
            <Side />
          </div>
          <Banner
            medias={mediaData && mediaData.length ? mediaData[0].Medias : []}
          />
          <div className=" hidden sm:block">
            <Side2 />
          </div>
        </div>
        <div className=" mt-16">
          {mediaData.map((item) => (
            <MediaRow
              medias={item.Medias}
              title={item.title}
              key={item.Medias[0].id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
