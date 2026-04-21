"use client";
import React, { useState } from 'react';
// 1. AnimatePresence add kiya hai transitions ke liye
import { motion, AnimatePresence } from 'framer-motion'; 
import { Search, ChevronDown, ChevronUp, MoreHorizontal, Plus, X } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// 2. Day 17 Form Component import
import AddLeadForm from '../components/forms/AddLeadForm';

type Lead = {
  id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  budget: number;
};

const defaultData: Lead[] = [
  { id: '1', name: 'Ali Khan', email: 'ali@example.com', status: 'New', budget: 5000 },
  { id: '2', name: 'Sara Ahmed', email: 'sara@test.com', status: 'Qualified', budget: 12000 },
  { id: '3', name: 'Zain Malik', email: 'zain@agency.io', status: 'Contacted', budget: 8500 },
  { id: '4', name: 'Ayesha Raza', email: 'ayesha@dev.pk', status: 'Lost', budget: 3000 },
  { id: '5', name: 'Omer Farooq', email: 'omer@startup.com', status: 'New', budget: 15000 },
];

const columnHelper = createColumnHelper<Lead>();

export default function LeadsPage() {
  const [globalFilter, setGlobalFilter] = useState('');
  // 3. Side Panel State
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const columns = [
    columnHelper.accessor('name', {
      header: 'Client Name',
      cell: info => <span className="font-bold text-white">{info.getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email Address',
      cell: info => <span className="text-gray-400">{info.getValue()}</span>,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        const colors = {
          New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          Contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          Qualified: 'bg-green-500/10 text-green-400 border-green-500/20',
          Lost: 'bg-red-500/10 text-red-400 border-red-500/20',
        };
        return <span className={`px-3 py-1 rounded-full text-xs border ${colors[status]}`}>{status}</span>;
      },
    }),
    columnHelper.accessor('budget', {
      header: 'Budget',
      cell: info => <span className="text-accent font-mono">${info.getValue().toLocaleString()}</span>,
    }),
    columnHelper.display({
      id: 'actions',
      cell: () => (
        <button className="p-2 hover:bg-navy-700 rounded-lg transition-colors text-gray-400 hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: defaultData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 6 } },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative min-h-[80vh]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Leads Pipeline</h1>
          <p className="text-gray-400 mt-1">Convert your prospects into successful projects.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Filter leads..."
              className="bg-navy-900/50 border border-navy-700 text-white pl-10 pr-4 py-2.5 rounded-xl focus:border-accent outline-none w-full transition-all"
            />
          </div>
          
          {/* 4. Add Lead Button (Day 17 Add) */}
          <button 
            onClick={() => setIsPanelOpen(true)}
            className="bg-accent text-navy-950 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-accent/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20"
          >
            <Plus size={20} />
            Add Lead
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-navy-900/50 border border-navy-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-navy-950/80 border-b border-navy-800">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500 cursor-pointer hover:text-accent transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp size={14} />,
                          desc: <ChevronDown size={14} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-navy-800/50">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-accent/[0.02] transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-5 text-sm border-b border-navy-800/30">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 border-t border-navy-800 flex items-center justify-between bg-navy-950/20">
          <p className="text-xs text-gray-500">Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
          <div className="flex gap-3">
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 border border-navy-700 rounded-lg text-xs hover:bg-navy-800 disabled:opacity-30 transition-all">Previous</button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="px-4 py-2 border border-navy-700 rounded-lg text-xs hover:bg-navy-800 disabled:opacity-30 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* 5. Slide-over Panel Integration (Day 17 Logic) */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
            />
            
            {/* Right Side Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-lg bg-navy-900 border-l border-navy-700 z-[70] shadow-[ -20px_0_50px_rgba(0,0,0,0.5)] p-0 overflow-hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="p-8 border-b border-navy-800 flex justify-between items-center bg-navy-950/50">
                <div>
                  <h2 className="text-2xl font-bold text-white">Capture New Lead</h2>
                  <p className="text-gray-400 text-sm mt-1">Fill in the details to expand your pipeline.</p>
                </div>
                <button 
                  onClick={() => setIsPanelOpen(false)}
                  className="p-2 hover:bg-navy-800 rounded-full text-gray-500 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Panel Form Body */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <AddLeadForm onSuccess={(data) => {
                  console.log("Day 17 - New Lead Received:", data);
                  // Yahan hum future mein API Call/Mutation karenge
                  setIsPanelOpen(false); 
                }} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

