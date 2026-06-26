import type { Page } from '@playwright/test'

export async function setGamingPlanStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.setItem(
      'gamingplan-storage',
      JSON.stringify({
        state: {
          full_name: 'Stephen King',
          email_address: 'stephenking@lorem.com',
          phone_number: '+1 234 567 8901',
          show_yearly: false,
          plan: 'Advanced',
          plan_monthly_price: 12,
          plan_yearly_price: 120,
          addons: ['online_service', 'larger_storage'],
          chosen_addons: [
            {
              name: 'online_service',
              label: 'Online Service',
              description: 'Access to multiplayer games',
              monthly_price: 1,
              yearly_price: 10,
            },
            {
              name: 'larger_storage',
              label: 'Larger storage',
              description: 'Extra 1TB of cloud save',
              monthly_price: 2,
              yearly_price: 20,
            },
          ],
        },
        version: 0,
      }),
    )
  })
}

export async function clearStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}

export async function waitForReact(page: Page, formId: string) {
  await page.waitForFunction((id: string) => {
    const el = document.getElementById(id)
    if (!el) return false
    return Object.keys(el).some(
      (k) => k.startsWith('__reactProps$') || k.startsWith('__reactFiber$'),
    )
  }, formId)
}

const DEVTOOLS_SELECTOR =
  'img[alt*="Devtools"], [aria-label*="Devtools"], [class*="tsqd"], button[aria-label*="Devtools"]'

export async function hideDevtools(page: Page) {
  await page.addInitScript((selector: string) => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach((el) => el.remove())
    })
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })
    document.querySelectorAll(selector).forEach((el) => el.remove())
  }, DEVTOOLS_SELECTOR)
  await page.evaluate((selector: string) => {
    document.querySelectorAll(selector).forEach((el) => el.remove())
  }, DEVTOOLS_SELECTOR)
}

export async function submitForm(page: Page, formId: string) {
  await hideDevtools(page)
  await page.locator(`[type="submit"][form="${formId}"]`).click()
}

export async function navigateTo(page: Page, url: string) {
  await hideDevtools(page)
  await page.goto(url)
}
