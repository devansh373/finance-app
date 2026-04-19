



"use client";
import { useState } from "react";
import api from "@/lib/api"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, User, Mail, Lock, Eye, EyeOff } from "lucide-react"; 

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name || name.length < 2) return "Name must be at least 2 characters";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Invalid email";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMsg(error);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      await api.post("/auth/signup", formData);

      setMsg(" Signup successful! Redirecting...");
      router.push("/kyc/pan");
    } catch (err) {
      if (err instanceof Error) setMsg(err.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = msg.includes("successful");

  return (
    
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <Link
        href={"/"}
        className="w-full mt-5 pl-5 underline hover:text-white text-xl mb-30 text-teal-300"
      >
        Home
      </Link>
    
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl w-full max-w-md space-y-6">
        
    
        <h1 className="text-3xl font-bold text-white text-center">
          Create Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
    
          <div>
            <label className="block text-gray-400 font-medium mb-1 text-sm">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          
          <div>
            <label className="block text-gray-400 font-medium mb-1 text-sm">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          
          <div>
            <label className="block text-gray-400 font-medium mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Dynamically change type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                // Add padding-right to make space for the icon
                className="w-full pl-10 pr-10 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              
              {/* Show/Hide Toggle Button */}
              <button
                type="button" // Important: type="button" to prevent form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-gray-900 font-bold py-3 rounded-lg cursor-pointer hover:bg-teal-400 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Signing up...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        {/* Message Area */}
        {msg && (
          <p
            className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
              isSuccess 
                ? "text-emerald-300 bg-emerald-900/50 border border-emerald-700" 
                : "text-rose-300 bg-rose-900/50 border border-rose-700"
            }`}
          >
            {msg}
          </p>
        )}
        
        {/* Log In Link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline hover:no-underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

