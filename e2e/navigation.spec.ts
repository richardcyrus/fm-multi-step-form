import { expect, test } from '@playwright/test'
import { clearStorage, navigateTo, submitForm, waitForReact } from './helpers'

test.beforeEach(async ({ page }) => {
  await navigateTo(page, '/your-info')
  await clearStorage(page)
})

test('go back to a previous step to update selections', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')

  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  await page.getByText('Pro').first().click()
  await waitForReact(page, 'select-plan')
  await submitForm(page, 'select-plan')

  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  await page.getByLabel('Online Service').check()
  await waitForReact(page, 'select-addons')
  await submitForm(page, 'select-addons')

  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )
  await expect(page.getByText('Pro')).toBeVisible()

  await page.getByRole('button', { name: 'Go Back' }).click()
  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  await expect(page.getByLabel('Online Service')).toBeChecked()
  await page.getByLabel('Customizable profile').check()
  await waitForReact(page, 'select-addons')
  await submitForm(page, 'select-addons')

  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )
  await expect(page.getByText('Customizable profile')).toBeVisible()

  await page.getByText('Change').click()
  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  await page.getByText('Arcade').first().click()

  const toggle = page.locator('#toggle-switch')
  await toggle.click()

  await waitForReact(page, 'select-plan')
  await submitForm(page, 'select-plan')

  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  await waitForReact(page, 'select-addons')
  await submitForm(page, 'select-addons')

  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )
  await expect(page.getByText('Arcade')).toBeVisible()
  await expect(page.getByText('Yearly')).toBeVisible()
})
