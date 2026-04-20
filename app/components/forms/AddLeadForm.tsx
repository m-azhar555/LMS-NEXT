"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, LeadFormValues } from '@/lib/validations/lead';
import { motion } from 'framer-motion';

export default function AddLeadForm({ onSuccess }: { onSuccess: (data: LeadFormValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { status: 'New' }
  });

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="space-y-5">
      {/* Name Field */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-400">Client Name</label>
        <input
          type="number"
    {...register("budget", { valueAsNumber: true })} // Yeh zaroori hai
          className={`w-full bg-navy-950 border ${errors.name ? 'border-red-500' : 'border-navy-700'} p-3 rounded-xl focus:border-accent outline-none transition-all text-white`}
        />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email & Budget (Row) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">Email</label>
          <input
            {...register("email")}
            className="w-full bg-navy-950 border border-navy-700 p-3 rounded-xl focus:border-accent outline-none text-white"
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-400">Budget ($)</label>
          <input
            type="number"
            {...register("budget")}
            className="w-full bg-navy-950 border border-navy-700 p-3 rounded-xl focus:border-accent outline-none text-white"
          />
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
        </select>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-accent text-navy-950 font-bold py-4 rounded-xl shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all flex justify-center items-center"
      >
        {isSubmitting ? "Creating..." : "Create New Lead"}
      </motion.button>
    </form>
  );
}