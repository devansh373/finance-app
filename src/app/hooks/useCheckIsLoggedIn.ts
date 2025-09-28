/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/state";

export default function useCheckIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const [userAtomValue, setUserAtomValue] = useAtom(userAtom);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      if (!userAtomValue) {
        try {
          const res = await api.get(`/auth/profile`);

          if (res.data.email) {
            setIsLoggedIn(true);
            setUserAtomValue(res.data.email);
            console.log("logged in")
          } else {
            setIsLoggedIn(false);
            router.replace("/login");
          }
        } catch {
          setIsLoggedIn(false);
          router.replace("/login");
        } finally {
          setChecking(false);
        }
      } else {
        setIsLoggedIn(true);
        setChecking(false);
      }
    };

    fetchLoggedInUser();
    console.log(userAtomValue);
  }, [router, userAtomValue]);

  return { isLoggedIn, checking };
}
