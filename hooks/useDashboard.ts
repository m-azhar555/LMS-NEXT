import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Filhal hum sample data return kar rahe hain
      // Real app mein: const { data } = await api.get('/stats'); return data;
      return {
        leads: 1284,
        conversion: '64%',
        revenue: '$12,400',
        activeProjects: 12
      };
    },
    staleTime: 60000, // 1 minute tak data refresh nahi hoga (Performance optimization)
  });
};