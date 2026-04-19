import Link from "next/link";
import {
  Zap,
  TrendingUp,
  MessageSquare,
  UserCheck,
  Lock,
  BarChart2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-gray-900 p-4 pt-20 pb-40 text-center overflow-hidden">
      {/* Top-right blob */}
      <div
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[50rem] h-[50rem] 
                   bg-gradient-to-bl from-teal-900/50 via-indigo-900/30 to-gray-900/10 
                   rounded-full blur-3xl opacity-50 z-10"
        aria-hidden="true"
      />
      {/* Bottom-left blob */}
      <div
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[40rem] h-[40rem] 
                   bg-gradient-to-tr from-indigo-900/60 via-teal-900/30 to-gray-900/10 
                   rounded-full blur-3xl opacity-90 z-10"
        aria-hidden="true"
      />

      <div className="space-y-8 max-w-5xl mb-32 z-10">
        <h1 className="text-5xl  tracking-wider text-white sm:text-6xl md:text-8xl leading-tight">
          Master Your <span className="text-indigo-400">Wealth</span>
          <br className="hidden md:block" /> with{" "}
          <span className="text-teal-400">Intelligent Tools</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl text-gray-400 sm:text-2xl">
          Your simple, intuitive platform for tracking investments, analyzing{" "}
          <span className="font-bold text-white">
            real-time market sentiment
          </span>
          , and securing your financial future.
        </p>

        <div className="pt-8">
          <Link
            href="/products"
            className="
              inline-block px-10 py-4 
              bg-teal-500 text-gray-900 text-xl font-bold 
              rounded-xl shadow-2xl shadow-teal-500/50
              transform transition-all duration-300 
               hover:bg-teal-400 
              hover:outline-none hover:ring-2 hover:ring-offset-4 hover:ring-teal-500 hover:ring-offset-gray-900
            "
          >
            Start Investing Now →
          </Link>
        </div>

        <div className="pt-4 text-gray-500 text-sm">
          <p className="flex items-center justify-center space-x-2">
            <Zap size={18} className="text-indigo-400" />
            <span>Real-time data | Zero commission fees | Instant setup</span>
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 mb-32 z-10">
        <h2 className="text-4xl font-bold text-white mb-12">
          Get Started in Minutes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Create Account
            </h3>
            <p className="text-gray-400">
              Sign up securely with just your email and password.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Explore Products
            </h3>
            <p className="text-gray-400">
              Browse real-time data for stocks and other assets.
            </p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Invest & Track
            </h3>
            <p className="text-gray-400">
              Buy assets and monitor your portfolio&apos;s performance live.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mb-32 w-full z-10">
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
          <div className="p-8 md:p-12 text-left">
            <span className="inline-block bg-teal-900/50 text-teal-300 text-sm font-semibold px-3 py-1 rounded-full border border-teal-700 mb-4">
              Key Feature
            </span>

            <h2 className="text-4xl font-bold text-white mb-4">
              Go Beyond the Numbers
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Our system analyzes **thousands of news articles** and social
              media posts in real-time to give you a simple **Positive,
              Negative, or Neutral** sentiment score for every stock. Stop
              guessing what the market thinks.
            </p>
            <Link
              href="/products"
              className="font-bold text-teal-400 hover:text-teal-300 transition-colors text-lg"
            >
              See It in Action →
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center p-12 bg-gray-900 h-full relative overflow-hidden">
            <div
              className="absolute -left-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-xl"
              aria-hidden="true"
            ></div>
            <BarChart2 size={150} className="text-indigo-400 opacity-60 z-10" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 mb-32 z-10">
        <h2 className="text-4xl font-bold text-white mb-12">
          An All-in-One Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-teal-500 hover:shadow-teal-500/10">
            <Zap size={32} className="text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Real-Time Insights
            </h3>
            <p className="text-gray-400">
              Access live stock quotes and market updates. Base your decisions
              on the fastest, most accurate information available.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500 hover:shadow-indigo-500/10">
            <TrendingUp size={32} className="text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Intelligent Portfolio
            </h3>
            <p className="text-gray-400">
              Track your invested capital, current value, and returns with clear
              visualizations. Understand your performance instantly.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-500 hover:shadow-emerald-500/10">
            <MessageSquare size={32} className="text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              AI-Powered Guidance
            </h3>
            <p className="text-gray-400">
              Get instant answers and market explanations from our integrated
              chatbot, making complex finance accessible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-16 mb-32 z-10">
        <h2 className="text-4xl font-bold text-white mb-12">
          Your Security is Our Priority
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center space-x-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Lock size={32} className="text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Data Encryption
              </h3>
              <p className="text-gray-400">
                All your personal information and transactions are secured with
                end-to-end encryption.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center space-x-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <UserCheck size={32} className="text-indigo-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Secure KYC</h3>
              <p className="text-gray-400">
                We follow strict KYC protocols to verify all users, ensuring a
                safe and compliant platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto z-10">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Take Control?
        </h2>
        <p className="text-xl text-gray-400 mb-10">
          Join thousands of users building their wealth with smarter tools. Get
          started today.
        </p>
        <Link
          href="/signup"
          className="
              inline-block px-10 py-4 
              bg-teal-500 text-gray-900 text-xl font-bold 
              rounded-xl shadow-2xl shadow-teal-500/50
              transform transition-all duration-300 
              hover:scale-[1.03] hover:bg-teal-400 hover:shadow-teal-400/40
              focus:outline-none
            "
        >
          Sign Up for Free
        </Link>
      </div>
    </main>
  );
}
