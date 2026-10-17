import { test, expect } from '@playwright/test';

test('menu starts, resumes, confirms restart and explains available controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Tiếp tục', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Hướng dẫn', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Cùng bắt đầu nhé!' })).toBeVisible();
  await page.getByRole('button', { name: 'Về menu', exact: true }).click();
  await page.getByRole('button', { name: 'Âm thanh: Bật' }).click();
  await expect(page.getByRole('button', { name: 'Âm thanh: Tắt' })).toHaveAttribute('aria-pressed', 'false');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Âm thanh: Tắt' })).toBeVisible();
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bỏ qua mở đầu' }).click();
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-01');
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await expect(page.locator('.game-host')).toHaveAttribute('data-scene', 'moon');
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Giữ cảnh hiện tại' }).click();
  await expect(page.getByRole('button', { name: 'Tiếp tục', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bắt đầu lại', exact: true }).click();
  await expect(page.locator('.game-host')).toHaveAttribute('data-scene', 'earth');
  await expect(page.locator('.dialogue-next')).toBeFocused();
});
