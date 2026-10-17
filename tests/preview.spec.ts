import { test, expect } from '@playwright/test';

test('scene preview preserves layout, click mapping, and a single canvas after resizing and switching', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.url().includes('/images/') && response.status() >= 400) errors.push(response.url());
  });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  const host = page.locator('.game-host');
  await expect(host).toHaveAttribute('data-ready', 'true');
  await page.getByText('Kiểm tra bản dựng', { exact: false }).click();
  await page.getByRole('checkbox').check();
  await expect(host).toHaveAttribute('data-ready', 'true');

  for (const size of [{ width: 1280, height: 720 }, { width: 1440, height: 900 }, { width: 900, height: 720 }]) {
    await page.setViewportSize(size);
    await expect.poll(async () => {
      const canvas = await page.locator('canvas').boundingBox();
      const wrap = await page.locator('.canvas-wrap').boundingBox();
      return !!canvas && !!wrap && Math.abs(canvas.width - wrap.width) < 2;
    }).toBe(true);
    const canvas = (await page.locator('canvas').boundingBox())!;
    expect(Math.abs(canvas.width / canvas.height - 16 / 9)).toBeLessThan(0.01);
    const book = (await page.getByRole('complementary').boundingBox())!;
    expect(canvas.x + canvas.width).toBeLessThan(book.x);
    const frame = (await page.locator('.scene-frame').boundingBox())!;
    const sheet = (await page.locator('.book-sheet').boundingBox())!;
    expect(Math.abs(sheet.y - frame.y)).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.mouse.click(canvas.x + canvas.width * 0.5, canvas.y + canvas.height * 0.5);
    await expect(page.getByTestId('coordinates')).toContainText('x: 480, y: 270');
  }
  await page.getByRole('button', { name: '02 Mặt Trăng' }).click();
  await expect(host).toHaveAttribute('data-scene', 'moon');
  await expect(host).toHaveAttribute('data-ready', 'true');
  const moon = (await page.locator('canvas').boundingBox())!;
  await page.mouse.click(moon.x + moon.width * 520 / 960, moon.y + moon.height * 380 / 540);
  await expect(page.getByTestId('coordinates')).toContainText('Ghế đá');
  for (let i = 0; i < 5; i++) {
    await page.getByRole('button', { name: '01 Hiên nhà' }).click();
    await page.getByRole('button', { name: '02 Mặt Trăng' }).click();
  }
  await expect(host).toHaveAttribute('data-ready', 'true');
  await expect(page.locator('canvas')).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('missing sprites give a visible failure instead of an endless loading screen', async ({ page }) => {
  await page.route('**/an-spritesheet.png', (route) => route.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await expect(page.getByRole('status')).toContainText('Không tải được ảnh: an');
});
