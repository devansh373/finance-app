

"use client";
import { useState } from "react";
import api from "@/lib/api"; 
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const queryParams = useSearchParams();
  const next = queryParams.get("next");
  console.log(next)
  


  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!email || !isValidEmail(email)) {
      setMsg("Please enter a valid email");
      return;
    }

    if (!password) {
      setMsg("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const user = res.data.user;

      setMsg("Login successful");

      // redirect using next search params if any


      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) setMsg(err.message || "Error logging in");
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
      
      <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-8 w-full max-w-md">
        
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-gray-400 font-medium mb-1 text-sm">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                
                className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          
          <div>
            <label className="block text-gray-400 font-medium mb-1 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                
                className="w-full pl-10 pr-10 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              
              
              <button
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            
            className="w-full bg-teal-500 hover:bg-teal-400 cursor-pointer text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        
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

        
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline hover:no-underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

