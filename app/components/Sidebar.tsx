"use client";
// 1. Link aur usePathname ko import kiya gaya hai
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, LogOut, Code2 } from "lucide-react";

const Sidebar = () => {
  // 2. Current URL path ko track karne ke liye
  const pathname = usePathname(); 

  // 3. Har item ke sath uska 'path' add kiya gaya hai
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Leads', icon: Users, path: '/leads' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 bg-navy-900 border-r border-navy-700 h-screen fixed left-0 top-0 p-6 flex flex-col z-50">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-accent rounded-lg">
          <Code2 className="text-navy-900" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-wider text-white">CODEVECTOR</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        {menu.map((item) => {
          // 4. Check karein kya yeh page abhi open hai
          const isActive = pathname === item.path;

          return (
            // 5. Framer Motion div ko Link tag ke andar wrap kiya hai
            <Link key={item.name} href={item.path}>
              <motion.div
                whileHover={{ x: 10 }}
                className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group mt-2 ${
                  isActive 
                    ? 'bg-accent/10 text-accent border border-accent/20' // Active state styling (Pro look)
                    : 'text-gray-400 hover:bg-navy-800 hover:text-accent border border-transparent'
                }`}
              >
                <item.icon 
                  size={20} 
                  // Active icon ko thoda scale rakha hai
                  className={`transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-navy-700 pt-6">
        <button className="flex items-center gap-4 text-red-400 hover:bg-red-500/10 p-3 rounded-xl hover:text-red-300 w-full transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;