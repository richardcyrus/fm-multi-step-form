import { expect, test } from '@playwright/test'
import { clearStorage, navigateTo, submitForm, waitForReact } from './helpers'

test.beforeEach(async ({ page }) => {
  await navigateTo(page, '/your-info')
  await clearStorage(page)
})

test('next step button has hover state', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  const button = page.locator('[type="submit"][form="your-info"]')
  await button.hover()
  await expect(button).toBeVisible()
})

test('name input has focus state', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  const input = page.locator('#full_name')
  await input.focus()
  await expect(input).toBeFocused()
})

test('radio card has hover state', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')

  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  const radioCard = page
    .locator('label')
    .filter({ hasText: 'Advanced' })
    .first()
  await radioCard.hover()
  await expect(radioCard).toBeVisible()
})

test('toggle switch has hover state', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')

  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  const toggle = page.locator('#toggle-switch')
  await toggle.hover()
  await expect(toggle).toBeVisible()
})

test('checkbox card has hover state', async ({ page }) => {
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

  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  const checkbox = page.getByLabel('Online Service')
  await checkbox.hover()
  await expect(checkbox).toBeVisible()
})

test('go back button has hover state', async ({ page }) => {
  await navigateTo(page, '/your-info')
  await waitForReact(page, 'your-info')
  await page.locator('#full_name').fill('Stephen King')
  await page.locator('#email_address').fill('stephenking@lorem.com')
  await page.locator('#phone_number').fill('+1 234 567 8901')
  await submitForm(page, 'your-info')

  await expect(
    page.getByRole('heading', { name: 'Select your plan' }),
  ).toBeVisible({ timeout: 15000 })
  const backButton = page.getByRole('button', { name: 'Go Back' })
  await backButton.hover()
  await expect(backButton).toBeVisible()
})

test('change link on summary has hover state', async ({ page }) => {
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

  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  await page.getByLabel('Online Service').check()
  await waitForReact(page, 'select-addons')
  await submitForm(page, 'select-addons')

  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )
  const changeLink = page.getByText('Change')
  await changeLink.hover()
  await expect(changeLink).toBeVisible()
})

test('confirm button has hover state', async ({ page }) => {
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

  await expect(page.getByRole('heading', { name: 'Pick add-ons' })).toBeVisible(
    { timeout: 15000 },
  )
  await page.getByLabel('Online Service').check()
  await waitForReact(page, 'select-addons')
  await submitForm(page, 'select-addons')

  await expect(page.getByRole('heading', { name: 'Finishing up' })).toBeVisible(
    { timeout: 15000 },
  )
  const confirmButton = page.getByRole('button', { name: 'Confirm' })
  await confirmButton.hover()
  await expect(confirmButton).toBeVisible()
})
