"use client";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/state";

export default function LogoutButton() {
  const router = useRouter();
  const [, setUserAtomValue] = useAtom(userAtom);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      // Clear the atom so useCheckIsLoggedIn updates immediately
      setUserAtomValue(null);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // Still clear local state as a safety measure
      setUserAtomValue(null);
      router.replace("/login");
    }
  };

  return (
    <button
      className="text-lg text-slate-300 transition-colors cursor-pointer hover:text-teal-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
