import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { GamingPlanSchema } from '@/lib/schema'

type GamingPlanState = GamingPlanSchema & {
  setData: (data: Partial<GamingPlanSchema>) => void
}

export const useGamingPlanStore = create<GamingPlanState>()(
  persist(
    (set) => ({
      full_name: '',
      email_address: '',
      phone_number: '',
      show_yearly: false,
      plan: '',
      plan_monthly_price: 0,
      plan_yearly_price: 0,
      addons: [],
      chosen_addons: [],
      setData: (data) => set(data),
    }),
    {
      name: 'gamingplan-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
