"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/state";
import api from "@/lib/api";

export default function Sidebar(){
  const pathname = usePathname();
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);

    const menuItems = [
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/pending-kyc", label: "Pending KYC" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/transactions", label: "Transactions" },
    ];

    const handleLogout = async () => {
      try {
        await api.post("/auth/logout");
        setUser(null); // Clear global state
        router.replace("/login");
      } catch (err) {
        console.error("Logout failed", err);
        setUser(null);
        router.replace("/login");
      }
    };

    return (
      <aside className="w-64 bg-white shadow-md flex flex-col sticky top-10 h-[calc(100vh-2.5rem)]">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-teal-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md font-medium transition ${
                pathname === item.href
                  ? "bg-teal-100 text-teal-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-md font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>
    );
}