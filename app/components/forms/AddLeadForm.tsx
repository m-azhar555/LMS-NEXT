"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, LeadFormValues } from '@/lib/validations/lead';
import { motion } from 'framer-motion';
// Tip: 'npm install sonner' karke toast use karein professional feel ke liye
import { toast } from 'sonner'; 

export default function AddLeadForm({ onSuccess }: { onSuccess: (data: LeadFormValues) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { status: 'New' }
  });

  // --- Day 18: API Submission Logic ---
  const onSubmit = async (data: LeadFormValues) => {
    try {
      // 1. Backend API ko data bhejna
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // 2. Agar success ho jaye
        toast.success("Lead created successfully!");
        onSuccess(data); // Table ko update karne ke liye
        reset(); // Form khali karne ke liye
      } else {
        // 3. Agar server koi error bhejta hai
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to connect to server");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name Field - Fixed logic here */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-400">Client Name</label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          {...register("name")} 
          className={`w-full bg-navy-950 border ${errors.name ? 'border-red-500' : 'border-navy-700'} p-3 rounded-xl focus:border-accent outline-none transition-all text-white`}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email & Budget (Row) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={`w-full bg-navy-950 border ${errors.email ? 'border-red-500' : 'border-navy-700'} p-3 rounded-xl focus:border-accent outline-none text-white`}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">Budget ($)</label>
          <input
            type="number"
            {...register("budget", { valueAsNumber: true })}
            className={`w-full bg-navy-950 border ${errors.budget ? 'border-red-500' : 'border-navy-700'} p-3 rounded-xl focus:border-accent outline-none text-white`}
          />
          {errors.budget && <p className="text-xs text-red-500">{errors.budget.message}</p>}
        </div>
      </div>

      {/* Status Selector */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-400">Pipeline Status</label>
        <select
          {...register("status")}
          className="w-full bg-navy-950 border border-navy-700 p-3 rounded-xl focus:border-accent outline-none text-white appearance-none"
        >
          <option value="New">New Lead</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-accent text-navy-950 font-bold py-4 rounded-xl shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></span>
            Syncing...
          </div>
        ) : "Create New Lead"}
      </motion.button>
    </form>
  );
}