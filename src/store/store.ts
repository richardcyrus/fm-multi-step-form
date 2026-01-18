import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { GamingPlanSchema } from '@/lib/schema'

type GamingPlanState = GamingPlanSchema & {
  reset: () => void
  setData: (data: Partial<GamingPlanSchema>) => void
  getMonthlyTotal: () => number
  getYearlyTotal: () => number
}

export const useGamingPlanStore = create<GamingPlanState>()(
  persist(
    (set, get) => ({
      full_name: '',
      email_address: '',
      phone_number: '',
      show_yearly: false,
      plan: '',
      plan_monthly_price: 0,
      plan_yearly_price: 0,
      addons: [],
      chosen_addons: [],
      reset: () =>
        set({
          full_name: '',
          email_address: '',
          phone_number: '',
          show_yearly: false,
          plan: '',
          plan_monthly_price: 0,
          plan_yearly_price: 0,
          addons: [],
          chosen_addons: [],
        }),
      setData: (data) => set(data),
      getMonthlyTotal: () => {
        const price = get().plan_monthly_price
        const addons_sum = get().chosen_addons.reduce(
          (sum, addon) => sum + addon.monthly_price,
          0,
        )
        return price + addons_sum
      },
      getYearlyTotal: () => {
        const price = get().plan_yearly_price
        const addons_sum = get().chosen_addons.reduce(
          (sum, addon) => sum + addon.yearly_price,
          0,
        )
        return price + addons_sum
      },
    }),
    {
      name: 'gamingplan-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
