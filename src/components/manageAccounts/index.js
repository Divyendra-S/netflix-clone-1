"use client";

import { useState, useContext, useEffect } from "react";
import { AppContext } from "@/context";
import { Axios } from "@/helper/httpHelper";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PinContainer from "./pinContainer";

const initialForm = {
  name: "",
  pin: "",
};

export const ManageAccounts = () => {
  const { Account, setAccount, loader, setLoader, setLoggedIn } =
    useContext(AppContext);
  const [formData, setFormData] = useState(initialForm);
  const [pin, setPin] = useState();
  const [deleteicon, setDeleteIcon] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [showPinContainer, setShowPinContainer] = useState({
    show: false,
    account: null,
  });
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const { data: session } = useSession();
  const getAllAccounts = async () => {
    setLoader(true);
    try {
      const result = await Axios.get(
        `/api/getAllAccounts`
      );
      if (result.data && result.data.message) {
        setAccount(result.data.message);
        setLoader(false);
        console.log(result);
      } else {
        setLoader(false);
        console.log("Account");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAccounts();
  },[]);
  
  

  const createAccount = async (formData) => {
    setLoader(true);
    try {
      const res = await Axios.post(`/api/createAccount`, {
        ...formData,
        uid: session?.user?.uid,
      });
      console.log(res);
      if (res.data.sucess) {
        setLoader(false);
        
        setFormData(initialForm);
        setShowAccountForm(false);
        console.log("works");
      } else {
        getAllAccounts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAccount = async (item) => {
    try {
      const res = await Axios.delete(`/api/deleteAccount?id=${item._id}`).then(
        (response) => {
          response.data;
        }
      );

      getAllAccounts();
      setDeleteIcon(false);
    } catch (err) {
      console.log(err);
    }
  };
  const login = async (value) => {
    setLoader(true);
    try {
      const result = await Axios.post(`/api/login`, {
        pin: value,
        accountId: showPinContainer.account._id,
        uid: session?.user?.uid,
      }).then((res) => res.data);
      console.log(result);
      if (result.sucess) {
        setLoader(false);
        setLoggedIn(showPinContainer.account);
        sessionStorage.setItem(
          "loggedIn",
          JSON.stringify(showPinContainer.account)
        );
        console.log();
        setPinError(false);
      } else {
        setPinError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>{console.log("accounttttt",Account)}
      <button onClick={() => signOut("github")} className="bg-gray-900 w-screen flex justify-end text-right pr-6 pt-4"><div className=" bg-red-500 w-20 rounded text-center ">Sign Out</div></button>
      <div className="flex h-screen justify-center  bg-gray-900 flex-col">
       <h1 className={` text-white text-5xl text-center font-bold ${Account?.length < 1 ? " mb-24" : null} `}> who's watching</h1>
      <div className=" flex  gap-3 items-center  justify-center ">
        {Account && Account.length > 0
          ? Account?.map((item) => {
              return (
                <li
                  className=" max-w-[200px]  w-[155] gap-3 items-center mt-6 cursor-pointer "
                  onClick={
                    deleteicon
                      ? null
                      : () => {
                          setShowPinContainer({
                            show: true,
                            account: item,
                          });
                        }
                  }
                  key={item._id}
                >
                  <div className="relative items-center flex justify-center">
                    <img
                      src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                      alt="Account"
                      className={`max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] ${opacity ? "opacity-60" : null}`}
                    />
                    {deleteicon ? (
                      <div
                        className="  text-center flex justify-center w-8 absolute z-10"
                        onClick={() => {
                          deleteAccount(item);
                          setOpacity(false)
                        }}
                      >
                        <TrashIcon width={30} height={30} color="black" />
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-4 text-white text-center pt-2">
                    {item.name}
                  </div>
                </li>
              );
            })
          : null}
          <div className="text-white">
        {Account && Account?.length < 4 ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant=" outline" className=" w-[150px]">
                {Account && Account.length < 4 ? (
                  <li
                    onClick={() => setShowAccountForm(!showAccountForm)}
                    className="max-w-[200px] min-w-[150px] flex items-center justify-center text-white rounded-lg bg-[#e5b109] min-h-[155px] text-center "
                  >
                    Add Account
                  </li>
                ) : null}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white">
              <DialogHeader>
                <DialogTitle>Add Account</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 text-white">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right ">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-3"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Pin
                  </Label>
                  <Input
                    id="username"
                    defaultValue=""
                    className="col-span-3"
                    onChange={(e) =>
                      setFormData({ ...formData, pin: e.target.value })
                    }
                    type="password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    createAccount(formData);
                  }}
                >
                  Add Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
        </div>
        </div>
        <div className="text-center">
          <span
            onClick={() => {setDeleteIcon(!deleteicon)
            setOpacity(!opacity)}}
            className={`border text-white mt-2 ${Account.length < 1 ? " mt-24" : null} border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]`}
          >
            Manage Profiles
          </span>
        </div>
        <PinContainer
          pin={pin}
          setPin={setPin}
          pinError={pinError}
          setPinError={setPinError}
          showPinContainer={showPinContainer.show}
          setShowPinContainer={setShowPinContainer}
          handlePinSubmit={login}
        />
      
      
      </div>
    </>
  );
};
//?id=${session?.user?.uid} ?id=65616112