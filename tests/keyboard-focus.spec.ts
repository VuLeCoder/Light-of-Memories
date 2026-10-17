import { test, expect } from '@playwright/test';

test('dialogue releases keyboard focus when clicking outside the game', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  const dialogue = page.locator('.dialogue');
  await expect(dialogue).toHaveAttribute('data-complete', 'true');
  const line = await dialogue.getAttribute('data-line');
  await page.locator('.book-topline').click();
  await page.keyboard.press('Space');
  await expect(dialogue).toHaveAttribute('data-line', line);
  await expect(page.locator('.dialogue-next')).not.toBeFocused();
  await page.locator('.game-stage').click({ position: { x: 40, y: 40 } });
  await expect(page.locator('.dialogue-next')).toBeFocused();
  await page.keyboard.press('Space');
  await expect(dialogue).not.toHaveAttribute('data-line', line!);
});

test('movement keys are captured only while the game has focus', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bỏ qua mở đầu' }).click();
  await expect(page.locator('.game-stage')).toBeFocused();
  const transitionScroll = await page.evaluate(() => window.scrollY);
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  expect(await page.evaluate(() => window.scrollY)).toBe(transitionScroll);
  for (const id of ['moon-01', 'moon-02']) {
    await expect(page.locator('.dialogue')).toHaveAttribute('data-line', id);
    await expect(page.locator('.dialogue')).toHaveAttribute('data-complete', 'true');
    await page.locator('.dialogue-next').click();
  }
  const host = page.locator('.game-host');
  const canvas = page.locator('canvas');
  const image = () => canvas.evaluate(el => (el as HTMLCanvasElement).toDataURL());
  // Finishing dialogue hands control to the canvas without another click.
  await expect(host).toBeFocused();
  const initial = await image();
  await page.keyboard.down('ArrowRight');
  await expect.poll(image).not.toBe(initial);
  // Lose focus with the key still held; releasing outside must not leave it stuck.
  await page.locator('.book-topline').click();
  await page.keyboard.up('ArrowRight');
  await page.waitForTimeout(100);
  const stopped = await image();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(200);
  expect(await image()).toBe(stopped);
  await canvas.click({ position: { x: 30, y: 100 } });
  await expect(host).toBeFocused();
  await page.waitForTimeout(200);
  expect(await image()).toBe(stopped);
  const y = await page.evaluate(() => window.scrollY);
  for (const key of ['Space', 'Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']) {
    await page.keyboard.press(key);
    await expect(host).toBeFocused();
  }
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => window.scrollY)).toBe(y);
  const afterKeys = await image();
  await page.locator('.language-picker select').focus();
  await page.keyboard.press('ArrowLeft');
  expect(await image()).toBe(afterKeys);
});
