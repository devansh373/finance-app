
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User } from "@/types/types";
import { Loader2 } from "lucide-react";

// --- NEW MODAL COMPONENT ---

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
}

/**
 * Helper function to get the Tailwind class for KYC status
 */
const getKycStatusClass = (status: string | undefined) => {
  switch (status) {
    case "Approved":
      return "text-green-600";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-yellow-600";
  }
};

/**
 * Formats the date string
 */
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onClose,
}) => {
  const kycStatus = user.kyc.pan?.status || "Pending";
  const kycStatusClass = getKycStatusClass(user.kyc.pan?.status);

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose} // Close modal on overlay click
    >
      {/* Modal Content */}
      <div
        className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-black relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button (Top-Right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-light"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-3xl font-bold text-gray-800 mb-6">User Profile</h3>

        <div className="space-y-4">
          {/* A reusable component for key-value pairs */}
          <InfoPair label="Name" value={user.name} />
          <InfoPair label="Email" value={user.email} />
          <InfoPair
            label="Role"
            value={user.role || "user"}
            className="capitalize"
          />
          <InfoPair label="Joined On" value={formatDate(user.createdAt)} />

          <hr className="my-6" />

          <h4 className="text-2xl font-semibold text-gray-700 mb-3">
            KYC Details
          </h4>
          <InfoPair
            label="PAN Status"
            value={kycStatus}
            valueClassName={`font-semibold ${kycStatusClass}`}
          />
          {/* Conditionally show PAN number if it exists */}
          {user.kyc.pan?.panNumber && (
            <InfoPair
              label="PAN Number"
              value={user.kyc.pan.panNumber}
              valueClassName="font-mono"
            />
          )}
          {/* You can add more KYC details here (e.g., Aadhaar) in the same way */}
        </div>

        {/* Footer Close Button */}
        <div className="mt-8 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper sub-component for the modal to reduce repetition
const InfoPair: React.FC<{
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
}> = ({ label, value, className = "", valueClassName = "" }) => (
  <div className={className}>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    <p className={`text-lg text-gray-900 ${valueClassName}`}>{value}</p>
  </div>
);

// --- UPDATED USERS COMPONENT ---

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State to manage the modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string, userName: string) => {
    // 1. Ask for confirmation
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${userName}? This action cannot be undone.`
    );

    if (!isConfirmed) {
      return;
    }

    try {
      // 2. Call the new API endpoint
      await api.delete(`/admin/users/${userId}`);

      // 3. Remove the user from the local state to update the UI
      setUsers(users.filter((user) => user._id !== userId));

      // Optionally: Set a success message
      // setSuccess("User deleted successfully.");
    } catch (err) {
      // 4. Handle errors
      console.error("Failed to delete user:", err);
      // Set error message. Note: this will replace the table.
      // You might want a different state for a non-blocking error (like a toast).
      setError("Failed to delete user. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-teal-600">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="text-lg font-medium text-gray-600">Retrieving user records...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-rose-50 border border-rose-200 text-rose-600 p-6 rounded-xl text-center shadow-sm">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );

  if (users.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">No users found.</p>
      </div>
    );
  }

  return (
    // Use a React Fragment to render the modal as a sibling
    <>
      <div className="bg-white p-6 rounded-xl shadow-md text-black">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">KYC Status</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{u.name}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4 capitalize">{u.role || "user"}</td>
                  <td
                    className={`px-6 py-4 font-medium ${getKycStatusClass(
                      u.kyc.pan?.status
                    )}`}
                  >
                    {u.kyc.pan?.status || "Pending"}
                  </td>
                  <td className="px-6 py-4">{formatDate(u.createdAt)}</td>
                  <td className="px-6 py-4 space-x-2">
                    {/* --- UPDATED BUTTON --- */}
                    <button
                      onClick={() => setSelectedUser(u)} // Set the selected user
                      className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600 text-sm cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(u._id, u.name)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CONDITIONALLY RENDER THE MODAL --- */}
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)} // Pass the close handler
        />
      )}
    </>
  );
}
