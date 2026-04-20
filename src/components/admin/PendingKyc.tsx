/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function PendingKycPage() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/pending-kyc");
      if (Array.isArray(res.data)) setUsers(res.data);
      else setUsers([]);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: any) => {
    setApprovingId(id);
    try {
      await api.patch("/admin/update-kyc-status/" + id, {
        status: "Approved",
      });
      await fetchUsers();
    } catch (error) {
      console.log(error);
    } finally {
      setApprovingId(null);
    }
  };

  const pendingKycUsers =  users?.filter((u:any) => u.status === "Approval_Pending");

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-teal-600">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-lg font-medium text-gray-600">Checking pending verifications...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-600 p-6 rounded-xl text-center shadow-sm">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );

  if (pendingKycUsers.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center h-48">
        <p className="text-gray-500 font-medium text-lg">No pending KYC requests found at the moment.</p>
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
                    className={`p-2 rounded-lg text-white transition ${approvingId === u._id ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"}`}
                    onClick={() => handleApprove(u._id)}
                    disabled={approvingId === u._id}
                  >
                    {approvingId === u._id ? "Approving..." : "Approve"}
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
