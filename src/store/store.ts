import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'
import type { GamingPlanSchema } from '@/lib/schema'

const initialState: GamingPlanSchema = {
  full_name: '',
  email_address: '',
  phone_number: '',
  show_yearly: false,
  plan: 'Arcade',
  plan_monthly_price: 9,
  plan_yearly_price: 90,
  addons: [],
  chosen_addons: [],
}

type GamingPlanState = GamingPlanSchema & {
  reset: () => void
  setData: (data: Partial<GamingPlanSchema>) => void
  // Computed properties
  monthlyTotal: number
  yearlyTotal: number
}

export const useGamingPlanStore = create<GamingPlanState>()(
  persist(
    (set, get) => ({
      ...initialState,
      reset: () => set(initialState),
      setData: (data) => set(data),

      // Computed getters
      get monthlyTotal() {
        const state = get()
        return (
          state.plan_monthly_price +
          state.chosen_addons.reduce(
            (sum, addon) => sum + addon.monthly_price,
            0,
          )
        )
      },

      get yearlyTotal() {
        const state = get()
        return (
          state.plan_yearly_price +
          state.chosen_addons.reduce(
            (sum, addon) => sum + addon.yearly_price,
            0,
          )
        )
      },
    }),
    {
      name: 'gamingplan-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

// Selectors for optimized subscriptions
export const usePersonalInfo = () =>
  useGamingPlanStore(
    useShallow((state) => ({
      full_name: state.full_name,
      email_address: state.email_address,
      phone_number: state.phone_number,
    })),
  )

export const usePlanSelection = () =>
  useGamingPlanStore(
    useShallow((state) => ({
      plan: state.plan,
      plan_monthly_price: state.plan_monthly_price,
      plan_yearly_price: state.plan_yearly_price,
      show_yearly: state.show_yearly,
    })),
  )

export const useAddons = () =>
  useGamingPlanStore(
    useShallow((state) => ({
      addons: state.addons,
      chosen_addons: state.chosen_addons,
      show_yearly: state.show_yearly,
    })),
  )

export const useSummary = () =>
  useGamingPlanStore(
    useShallow((state) => ({
      plan: state.plan,
      plan_monthly_price: state.plan_monthly_price,
      plan_yearly_price: state.plan_yearly_price,
      show_yearly: state.show_yearly,
      chosen_addons: state.chosen_addons,
      monthly_total: state.monthlyTotal,
      yearly_total: state.yearlyTotal,
    })),
  )
