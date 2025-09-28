"use client";
import { useEffect, useState, useMemo } from "react";
import api from "@/lib/api";
import { Transaction, User } from "@/types/types";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-teal-600"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center"
      role="alert"
    >
      <strong className="font-bold">An Error Occurred</strong>
      <p className="mt-2">{message}</p>
    </div>
  </div>
);

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className="bg-teal-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [txnSearch, setTxnSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [usersRes, txnRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/transactions"),
        ]);
        setUsers(usersRes.data);
        setTransactions(txnRes.data);
      } catch (err) {
        if (err instanceof Error)
          setError(
            "Failed to fetch dashboard data. Please check your connection and try again."
          );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(userSearch.toLowerCase())
      ),
    [users, userSearch]
  );

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.userId?.name.toLowerCase().includes(txnSearch.toLowerCase()) ||
          t.productId.name.toLowerCase().includes(txnSearch.toLowerCase())
      ),
    [transactions, txnSearch]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage users and monitor transaction activity.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Users"
                value={users.length}
                icon={<UserIcon />}
              />
              <StatCard
                title="Total Transactions"
                value={transactions.length}
                icon={<TransactionIcon />}
              />
              <StatCard
                title="Total Volume"
                value={`₹${transactions
                  .reduce((acc, t) => acc + t.totalAmount, 0)
                  .toLocaleString("en-IN")}`}
                icon={<VolumeIcon />}
              />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Users</h2>
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="border-gray-300 rounded-md pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Wallet Balance
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        KYC Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr
                        key={u._id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {u.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        <td className="px-6 py-4">
                          ₹{u.wallet.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              u.kycDocumentPath
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {u.kycDocumentPath ? "Completed" : "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Transactions
                </h2>
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by user or product..."
                    value={txnSearch}
                    onChange={(e) => setTxnSearch(e.target.value)}
                    className="border-gray-300 rounded-md pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((t) => (
                      <tr
                        key={t._id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {t.userId?.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {t.productId.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full uppercase ${
                              t.type === "BUY"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold">
                          ₹{t.totalAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-teal-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const TransactionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-teal-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h.01M12 7h.01M16 7h.01M9 17h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const VolumeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-teal-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);
const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
