"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Users, TrendingUp, DollarSign, Loader2 } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboard";

export default function Home() {
  const { data, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-accent" size={48} />
        <p className="text-gray-400 animate-pulse">Fetching Real-time Analytics...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Total Leads', value: data?.leads, icon: Users, color: 'text-blue-400' },
    { label: 'Conversion', value: data?.conversion, icon: TrendingUp, color: 'text-green-400' },
    { label: 'Revenue', value: data?.revenue, icon: DollarSign, color: 'text-accent' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">CodeVector <span className="text-accent">Live Hub</span></h2>
          <p className="text-gray-400">Your agency metrics are synced and up to date.</p>
        </div>
        <div className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Connection
        </div>
      </header>

      {/* Stats Cards with Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-navy-900 border border-navy-800 p-6 rounded-2xl hover:border-accent/30 transition-all cursor-default relative overflow-hidden group"
          >
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-3 bg-navy-800 rounded-xl ${stat.color} group-hover:bg-accent group-hover:text-navy-900 transition-all duration-300`}>
                <stat.icon size={22} />
              </div>
            </div>
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Recent Activity Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-navy-900 border border-navy-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            System Logs <span className="text-[10px] bg-navy-800 px-2 py-1 rounded text-gray-400">Day 15</span>
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={item} 
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-navy-800/50 border border-transparent hover:border-navy-700 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(78,168,222,0.5)]" />
                <p className="text-sm text-gray-300 flex-1">User authentication verified for lead #{400 + item}</p>
                <span className="text-xs text-gray-600 font-mono">OK 200</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info Card */}
        <div className="bg-accent rounded-3xl p-8 text-navy-950 flex flex-col justify-between overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
          <div>
            <h4 className="font-bold text-2xl mb-2">Pro Tip</h4>
            <p className="text-navy-900/80 text-sm">Axios Interceptors are working in the background to secure every request you make.</p>
          </div>
          <button className="mt-8 bg-navy-950 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95">
            View API Docs
          </button>
        </div>
      </div>
    </motion.div>
  );
}