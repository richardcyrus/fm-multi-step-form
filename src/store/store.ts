import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'
import type { GamingPlanSchema } from '@/lib/schema'
import { DEFAULT_PLAN, getPlanByLabel } from '@/lib/config'

const initialState: GamingPlanSchema = {
  full_name: '',
  email_address: '',
  phone_number: '',
  show_yearly: false,
  plan: DEFAULT_PLAN.label,
  plan_monthly_price: DEFAULT_PLAN.monthly_price,
  plan_yearly_price: DEFAULT_PLAN.yearly_price,
  addons: [],
  chosen_addons: [],
}

type GamingPlanState = GamingPlanSchema & {
  reset: () => void
  setData: (data: Partial<GamingPlanSchema>) => void
  updatePlan: (planLabel: string) => void
  toggleBilling: () => void
  getTotalPrice: (isYearly?: boolean) => number
}

export const useGamingPlanStore = create<GamingPlanState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        reset: () => set(initialState),
        setData: (data) => set(data),

        updatePlan: (planLabel) => {
          const plan = getPlanByLabel(planLabel)
          if (plan) {
            set({
              plan: plan.label,
              plan_monthly_price: plan.monthly_price,
              plan_yearly_price: plan.yearly_price,
            })
          }
        },

        toggleBilling: () =>
          set((state) => ({
            show_yearly: !state.show_yearly,
          })),

        getTotalPrice: (isYearly = get().show_yearly) => {
          const state = get()
          const planPrice = isYearly
            ? state.plan_yearly_price
            : state.plan_monthly_price
          const addonPrices = state.chosen_addons.reduce(
            (sum, addon) =>
              sum + (isYearly ? addon.yearly_price : addon.monthly_price),
            0,
          )
          return planPrice + addonPrices
        },
      }),
      {
        name: 'gamingplan-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
)

// Generic selector helper
const createSelector =
  <T>(selector: (state: GamingPlanState) => T) =>
  () =>
    useGamingPlanStore(useShallow(selector))

// Simplified selectors
export const usePersonalInfo = createSelector((state) => ({
  full_name: state.full_name,
  email_address: state.email_address,
  phone_number: state.phone_number,
}))

export const usePlanSelection = createSelector((state) => ({
  plan: state.plan,
  plan_monthly_price: state.plan_monthly_price,
  plan_yearly_price: state.plan_yearly_price,
  show_yearly: state.show_yearly,
}))

export const useAddons = createSelector((state) => ({
  addons: state.addons,
  chosen_addons: state.chosen_addons,
  show_yearly: state.show_yearly,
}))

export const useSummary = createSelector((state) => ({
  plan: state.plan,
  plan_monthly_price: state.plan_monthly_price,
  plan_yearly_price: state.plan_yearly_price,
  show_yearly: state.show_yearly,
  chosen_addons: state.chosen_addons,
  monthly_total: state.getTotalPrice(false),
  yearly_total: state.getTotalPrice(true),
}))

export const usePlanActions = createSelector((state) => ({
  updatePlan: state.updatePlan,
  toggleBilling: state.toggleBilling,
}))
