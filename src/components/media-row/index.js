'use client'
import { MediaItem } from "../media-item";
import { motion } from "framer-motion";

export const MediaRow = ({ medias, title }) => {
  return (
    <motion.div initial={{ opacity: 0, y:100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5 }} className="space-y-0.5 md:space-y-2 px-4 z-40">
      <div className=" ml-2 text-lg relative"> popular {title} shows </div>
      <div className="flex items-center w-auto scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2">
        {medias.map((item, id) => (
          <MediaItem media={item} key={id} id={id} />
        ))}
      </div>
    </motion.div>
  );
};
