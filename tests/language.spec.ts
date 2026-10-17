import { test, expect } from '@playwright/test';

test('language choice translates the menu and active dialogue without resetting progress', async ({ page }) => {
  await page.goto('/');
  const language = page.getByRole('combobox', { name: 'Chọn ngôn ngữ' });
  await expect(language).toHaveValue('vi');
  await language.selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Cuội · The Journey Begins');
  await expect(page.getByRole('button', { name: 'Start the journey' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Companion book' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Choose language' })).toHaveValue('en');

  await page.getByRole('button', { name: 'Start the journey' }).click();
  const dialogue = page.locator('.dialogue');
  await expect(dialogue).toHaveAttribute('data-line', 'earth-01');
  await expect(dialogue.locator('.dialogue-text')).toContainText('On the full moon of the eighth lunar month');
  await dialogue.locator('.dialogue-next').click();
  await dialogue.locator('.dialogue-next').click();
  await expect(dialogue).toHaveAttribute('data-line', 'earth-02');

  await page.getByRole('combobox', { name: 'Choose language' }).selectOption('vi');
  await expect(dialogue).toHaveAttribute('data-line', 'earth-02');
  await expect(dialogue.locator('.dialogue-text')).toContainText('Bé An ngồi trên hiên nhà');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Chọn ngôn ngữ' })).toHaveValue('vi');
});
