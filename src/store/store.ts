import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { GamingPlanSchema } from '@/lib/schema'

type GamingPlanState = Partial<GamingPlanSchema> & {
  setData: (data: Partial<GamingPlanSchema>) => void
}

export const useGamingPlanStore = create<GamingPlanState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: 'gamingplan-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
