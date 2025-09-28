"use client";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter()
  const handleLogout = async () => {
    await api.post("/auth/logout");
    router.replace("/login")
  };

  return <button className=" text-lg text-slate-300 transition-colors cursor-pointer hover:text-teal-600" onClick={handleLogout}>Logout</button>;
}
