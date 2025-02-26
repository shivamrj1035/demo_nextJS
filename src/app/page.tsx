"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Loader from "@/components/Loader"
import Modal from "@/components/MOdal"
import BubbleText from "@/components/BubbleText"
export default function ProfilePage() {
  const router = useRouter();
  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState({
    id: "",
    username: "John Doe",
    email: "johndoe@example.com",
  });
  const onLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/logout');
      toast.success('Logout successful!');
      router.push('/login');
    } catch (e: any) {
      console.log('Error', e.message);
      toast.error('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  const handleModal = () => {
    setOpen(!open);
  }

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/me');

      setUser({
        id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
      })

    }catch (e:any){
      console.log(e.message)
    }finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
        {
          loading ?
            <Loader/>
              :
              <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
                <BubbleText text={user.username} />
                <p className="text-gray-400">{user.email}</p>
                <p className="text-blue-500"><Link href={`/profile/${user.id}`}>Check User Id</Link></p>
                <button
                    onClick={onLogout}
                    disabled={buttonDisable}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-lg text-white font-semibold transition"
                >
                  {buttonDisable ? "Please fill up data" : "Logout"}
                </button>
                <button
                    onClick ={handleModal}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-6 py-3 rounded-lg text-white font-semibold transition"
                >
                  Fun?
                </button>
                {
                  open &&
                  <Modal isOpen={open} setIsOpen={setOpen}/>
                }
              </div>
              

        }
      </div>
  );
}
