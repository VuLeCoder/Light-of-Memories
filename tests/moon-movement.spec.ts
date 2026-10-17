import { test, expect } from '@playwright/test';

test('Cuội wakes before movement, then walks by click and keyboard; menu pauses him', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bỏ qua mở đầu' }).click();
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-01');
  for (const id of ['moon-01', 'moon-02']) {
    await expect(page.locator('.dialogue')).toHaveAttribute('data-line', id);
    await expect(page.locator('.dialogue')).toHaveAttribute('data-complete', 'true');
    await page.locator('.dialogue-next').click();
  }
  await expect(page.getByText('Di chuyển bằng A/D', { exact: false })).toBeVisible();
  const canvas = page.locator('canvas');
  const image = () => canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL());
  const initial = await image();
  const box = (await canvas.boundingBox())!;
  await page.mouse.click(box.x + box.width * 520 / 960, box.y + box.height * 470 / 540);
  await expect.poll(image).not.toBe(initial);
  await page.waitForTimeout(1600);
  const afterClick = await image();
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(500);
  await page.keyboard.up('ArrowRight');
  await expect.poll(image).not.toBe(afterClick);
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await page.waitForTimeout(100);
  const paused = await image();
  await page.waitForTimeout(400);
  expect(await image()).toBe(paused);
});
