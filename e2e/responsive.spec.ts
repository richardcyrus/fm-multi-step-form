import { expect, test } from '@playwright/test'
import { clearStorage, navigateTo, submitForm, waitForReact } from './helpers'

test.describe('Mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test.beforeEach(async ({ page }) => {
    await navigateTo(page, '/your-info')
    await clearStorage(page)
  })

  test('your-info renders at mobile size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await expect(page.getByText('Personal info')).toBeVisible()
    await expect(page.locator('#full_name')).toBeVisible()
    await expect(page.locator('#email_address')).toBeVisible()
    await expect(page.locator('#phone_number')).toBeVisible()
  })

  test('select-plan renders at mobile size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Arcade')).toBeVisible()
    await expect(page.getByText('Advanced')).toBeVisible()
    await expect(page.getByText('Pro')).toBeVisible()
  })

  test('addons renders at mobile size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByLabel('Online Service')).toBeVisible()
    await expect(page.getByLabel('Larger storage')).toBeVisible()
    await expect(page.getByLabel('Customizable profile')).toBeVisible()
  })

  test('summary renders at mobile size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByLabel('Online Service').check()
    await page.getByLabel('Larger storage').check()
    await waitForReact(page, 'select-addons')
    await submitForm(page, 'select-addons')
    await expect(
      page.getByRole('heading', { name: 'Finishing up' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Advanced')).toBeVisible()
    await expect(page.getByText('Online Service')).toBeVisible()
    await expect(page.getByText('Larger storage')).toBeVisible()
  })

  test('thank-you renders at mobile size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByLabel('Online Service').check()
    await page.getByLabel('Larger storage').check()
    await waitForReact(page, 'select-addons')
    await submitForm(page, 'select-addons')
    await expect(
      page.getByRole('heading', { name: 'Finishing up' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByRole('button', { name: 'Confirm' }).click()
    await expect(page.getByText('Thank you!')).toBeVisible()
  })
})

test.describe('Desktop viewport', () => {
  test.use({ viewport: { width: 1280, height: 800 } })

  test.beforeEach(async ({ page }) => {
    await navigateTo(page, '/your-info')
    await clearStorage(page)
  })

  test('your-info renders at desktop size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await expect(page.getByText('Personal info')).toBeVisible()
    await expect(page.locator('#full_name')).toBeVisible()
  })

  test('select-plan renders at desktop size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Arcade')).toBeVisible()
    await expect(page.getByText('Advanced')).toBeVisible()
    await expect(page.getByText('Pro')).toBeVisible()
  })

  test('addons renders at desktop size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByLabel('Online Service')).toBeVisible()
    await expect(page.getByLabel('Larger storage')).toBeVisible()
    await expect(page.getByLabel('Customizable profile')).toBeVisible()
  })

  test('summary renders at desktop size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByLabel('Online Service').check()
    await page.getByLabel('Larger storage').check()
    await waitForReact(page, 'select-addons')
    await submitForm(page, 'select-addons')
    await expect(
      page.getByRole('heading', { name: 'Finishing up' }),
    ).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Advanced')).toBeVisible()
    await expect(page.getByText('Online Service')).toBeVisible()
    await expect(page.getByText('Larger storage')).toBeVisible()
  })

  test('thank-you renders at desktop size', async ({ page }) => {
    await navigateTo(page, '/your-info')
    await waitForReact(page, 'your-info')
    await page.locator('#full_name').fill('Stephen King')
    await page.locator('#email_address').fill('stephenking@lorem.com')
    await page.locator('#phone_number').fill('+1 234 567 8901')
    await submitForm(page, 'your-info')
    await expect(
      page.getByRole('heading', { name: 'Select your plan' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByText('Advanced').first().click()
    await waitForReact(page, 'select-plan')
    await submitForm(page, 'select-plan')
    await expect(
      page.getByRole('heading', { name: 'Pick add-ons' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByLabel('Online Service').check()
    await page.getByLabel('Larger storage').check()
    await waitForReact(page, 'select-addons')
    await submitForm(page, 'select-addons')
    await expect(
      page.getByRole('heading', { name: 'Finishing up' }),
    ).toBeVisible({ timeout: 15000 })
    await page.getByRole('button', { name: 'Confirm' }).click()
    await expect(page.getByText('Thank you!')).toBeVisible()
  })
})
