"use client";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navbar from "./navbar";
import Banner from "./banner";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

export default function UnAuthPage() {
  const [ans, setAns] = useState(null);
  const [shows, setShows] = useState(true);
  const { data: session } = useSession();
  console.log(session?.user);
  const questions = [
    {
      ques: "What is Netflix?",
      ans: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!`,
      id: 1,
    },
    {
      ques: "How much does Netflix cost?",
      ans: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.",
      id: 2,
    },
    {
      ques: "What can I watch on Netflix?",
      ans: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
  
      You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`,
      id: 3,
    },
    {
      ques: "How do I cancel?",
      ans: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`,
      id: 4,
    },
    {
      ques: "What can I watch on Netflix?",
      ans: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`,
      id: 5,
    },
    {
      ques: "Is Netflix good for kids?",
      ans: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.
  
  Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`,
      id: 6,
    },
  ];

  return (
    <div className="relative bg-black min-h-screen ">
      <Navbar />
      <Banner />
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-5xl text-white mt-6 font-extrabold">
          Frequently Asked Questions
        </h1>
        <div className="  text-white p-7 h-[60rem]  text-2xl">
          {questions.map((item) => (
            <div key={item.id} className={`flex flex-col items-center`}>
              
              <div
                key={item.id}
                className=" flex justify-between font-semibold mt-4 lg:w-[1000px] bg-zinc-800 p-4 "
              >
                {item.ques}
                <PlusIcon
                  className="h-7 w-7"
                  color="white"
                  onClick={() => {  
                    if(ans === item.id){
                      setShows(!shows)
                    }else{
                    setShows(true);}
                    setAns(item.id);
                  }}
                />
                {console.log(ans,"anssssss")}
                
              </div>
              <div className=" overflow-hidden">
              {ans === item.id && shows  && <motion.div initial={{ opacity: 1, y: -100 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.1 }} exit={{ opacity: 0, y: -100 }} className={`transition-all text-xl transform duration-500 ease-in-out  ${ans === item.id ? 'max-h-[1000px]' : 'max-h-0'} w-full lg:w-[1000px] bg-zinc-800 p-4  border-t border-black `}>{item.ans}</motion.div>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
