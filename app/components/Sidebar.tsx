"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Settings, LogOut, Code2 } from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Leads', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-navy-900 border-r border-navy-700 h-screen fixed left-0 top-0 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 bg-accent rounded-lg">
          <Code2 className="text-navy-900" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-wider">CODEVECTOR</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-navy-800 transition-all text-gray-400 hover:text-accent group"
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.name}</span>
          </motion.div>
        ))}
      </nav>

      <div className="border-t border-navy-700 pt-6">
        <button className="flex items-center gap-4 text-red-400 hover:text-red-300 w-full transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;