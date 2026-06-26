import { expect, test } from '@playwright/test'
import { clearStorage, navigateTo, submitForm } from './helpers'

test('complete each step of the sequence and confirm order', async ({
  page,
}) => {
  await navigateTo(page, '/your-info')
  await clearStorage(page)

  await page.waitForFunction(() => {
    const form = document.getElementById('your-info')
    if (!form) return false
    return Object.keys(form).some(
      (key) =>
        key.startsWith('__reactProps$') || key.startsWith('__reactFiber$'),
    )
  })

  await expect(page.getByText('Personal info')).toBeVisible()
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')
  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })

  await page.getByText('Advanced').first().click()

  await page.waitForFunction(() => {
    const form = document.getElementById('select-plan')
    if (!form) return false
    return Object.keys(form).some(
      (key) =>
        key.startsWith('__reactProps$') || key.startsWith('__reactFiber$'),
    )
  })

  await submitForm(page, 'select-plan')
  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )

  await page.getByLabel('Online Service').check()
  await page.getByLabel('Larger storage').check()

  await page.waitForFunction(() => {
    const form = document.getElementById('select-addons')
    if (!form) return false
    return Object.keys(form).some(
      (key) =>
        key.startsWith('__reactProps$') || key.startsWith('__reactFiber$'),
    )
  })

  await submitForm(page, 'select-addons')
  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )

  await expect(page.getByText('Advanced')).toBeVisible()
  await expect(page.getByText('Online Service')).toBeVisible()
  await expect(page.getByText('Larger storage')).toBeVisible()

  await page.getByRole('button', { name: 'Confirm' }).click()
  await expect(page.getByText('Thank you!')).toBeVisible()
})
