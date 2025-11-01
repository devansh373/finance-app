/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
// import { User } from "@/types/types";

export default function PendingKycPage() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/pending-kyc");
        if(Array.isArray(res.data) && res.data.length>0)
        setUsers(res.data);
      else {
        console.log("first")
        setUsers([])};
      } catch {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
  const handleApprove = async (id:any) => {
    try {
       await api.patch("/admin/update-kyc-status/"+id, {
        status: "Approved",
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const pendingKycUsers =  users?.filter((u:any) => u.status === "Approval_Pending");

  if (loading) return <p>Loading KYC requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (pendingKycUsers.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-black">No pending KYC requests.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Pending KYC Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left w-full">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">KYC Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {pendingKycUsers.length>0 && pendingKycUsers.map((u:any) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 ">
                <td className="px-6 py-4">{u.user?.name}</td>
                <td className="px-6 py-4">{u.user?.email}</td>
                <td className="px-6 py-4 text-yellow-600 font-medium">
                  {u.status || "Pending"}
                </td>
                <td>
                  <button
                    className="bg-green-600 p-2 rounded-lg text-white cursor-pointer hover:bg-green-700"
                    onClick={()=>handleApprove(u._id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
