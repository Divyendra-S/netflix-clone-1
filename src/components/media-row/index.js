'use client'
import { MediaItem } from "../media-item";

export const MediaRow = ({ medias, title }) => {
  return (
    <div className="space-y-0.5 md:space-y-2 px-4 z-40">
      <div className=" ml-2 text-lg relative"> popular {title} shows </div>
      <div className="flex items-center w-auto scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
        {medias.map((item) => (
          <MediaItem media={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
