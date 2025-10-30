"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
  const pathname = usePathname();

    const menuItems = [
      { href: "/admin/dashboard", label: "Dashboard" },
      { href: "/admin/pending-kyc", label: "Pending KYC" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/transactions", label: "Transactions" },
      { href: "/admin/logout", label: "Logout" },
    ];
    return (
         <aside className="w-64 bg-white shadow-md flex flex-col sticky top-10">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-teal-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-md font-medium ${
                pathname === item.href
                  ? "bg-teal-100 text-teal-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    )
}