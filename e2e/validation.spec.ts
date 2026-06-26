import { expect, test } from '@playwright/test'
import { clearStorage, navigateTo, submitForm, waitForReact } from './helpers'

test.beforeEach(async ({ page }) => {
  await navigateTo(page, '/your-info')
  await clearStorage(page)
})

test('shows validation errors when required fields are missed on your-info', async ({
  page,
}) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await submitForm(page, 'your-info')

  await expect(page.getByText('This field is required')).toBeVisible()
  await expect(page.getByText('Enter a valid email address')).toBeVisible()
  await expect(page.getByText('Enter a valid phone number')).toBeVisible()
})

test('shows validation error when email address is not formatted correctly', async ({
  page,
}) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('not-an-email')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')

  await expect(page.getByText('Enter a valid email address')).toBeVisible()
})

test('route guard redirects from select-plan to your-info when personal info is missing', async ({
  page,
}) => {
  await navigateTo(page, '/select-plan')
  await expect(page.getByText('Personal info')).toBeVisible({ timeout: 15000 })
})

test('route guard redirects from addons to your-info when personal info is missing', async ({
  page,
}) => {
  await navigateTo(page, '/addons')
  await expect(page.getByText('Personal info')).toBeVisible({ timeout: 15000 })
})

test('route guard allows addons access with default plan selection', async ({
  page,
}) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')
  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  await page.getByText('Arcade').first().click()
  await waitForReact(page, 'select-plan')
  await submitForm(page, 'select-plan')
  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
})
