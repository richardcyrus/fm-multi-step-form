import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useGamingPlanStore } from '@/store/store'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {
      getStoreState: () => useGamingPlanStore.getState(),
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
