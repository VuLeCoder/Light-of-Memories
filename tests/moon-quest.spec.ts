import { test, expect, type Page } from '@playwright/test';

async function advance(page: Page, id: string) {
  const dialogue = page.locator('.dialogue');
  await expect(dialogue).toHaveAttribute('data-line', id);
  if (await dialogue.getAttribute('data-complete') !== 'true') await page.locator('.dialogue-next').click();
  await expect(dialogue).toHaveAttribute('data-complete', 'true');
  await page.locator('.dialogue-next').click();
}
async function startMoon(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bỏ qua mở đầu' }).click();
  await advance(page, 'moon-01');
  await advance(page, 'moon-02');
}
async function clickScene(page: Page, x: number, y: number) {
  const box = (await page.locator('canvas').boundingBox())!;
  await page.mouse.click(box.x + box.width * x / 960, box.y + box.height * y / 540);
}

test('bench gates dialogue, lantern and exit; both languages and stay/menu work', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await startMoon(page);
  await page.keyboard.press('e'); // Too far from the bench.
  await expect(page.locator('.dialogue')).toHaveCount(0);
  await clickScene(page, 930, 470);
  await page.waitForTimeout(3800);
  await expect(page.locator('.opening-complete')).toHaveCount(0);
  await expect(page.locator('.quest-hud strong')).toHaveCount(0);
  await clickScene(page, 520, 370);
  await advance(page, 'moon-03');
  await advance(page, 'moon-04');
  await expect(page.locator('.dialogue-meta strong')).toHaveText('Cây Đa');
  await page.getByRole('combobox').selectOption('en');
  await expect(page.locator('.dialogue-meta strong')).toHaveText('Banyan tree');
  await page.getByRole('combobox').selectOption('vi');
  await advance(page, 'moon-05');
  await advance(page, 'moon-06');
  await expect(page.locator('.quest-hud strong')).toHaveCount(0);
  await advance(page, 'moon-07');
  await expect(page.locator('.quest-hud strong')).toContainText('0/5');
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-08');
  await advance(page, 'moon-08');
  await advance(page, 'moon-09');
  await clickScene(page, 930, 470);
  await expect(page.locator('.opening-complete')).toBeVisible({ timeout: 7000 });
  await page.getByRole('button', { name: 'Ở lại khám phá' }).click();
  await expect(page.locator('.opening-complete')).toHaveCount(0);
  await page.waitForTimeout(200);
  await expect(page.locator('.opening-complete')).toHaveCount(0);
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(600);
  await page.keyboard.up('ArrowLeft');
  await clickScene(page, 930, 470);
  await expect(page.locator('.opening-complete')).toBeVisible();
  await page.getByRole('button', { name: 'Về menu', exact: true }).click();
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await expect(page.locator('.opening-complete')).toBeVisible();
  expect(errors).toEqual([]);
});

test('keyboard cancels pending bench interaction, E works nearby, menu pauses dialogue', async ({ page }) => {
  await startMoon(page);
  await clickScene(page, 520, 370);
  await page.keyboard.down('a');
  await page.waitForTimeout(300);
  await page.keyboard.up('a');
  await page.waitForTimeout(1200);
  await expect(page.locator('.dialogue')).toHaveCount(0);
  await clickScene(page, 500, 480);
  await page.waitForTimeout(1800);
  await page.keyboard.press('e');
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-03');
  await expect(page.locator('.dialogue')).toHaveAttribute('data-complete', 'true');
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await expect(page.locator('.dialogue')).toBeHidden();
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-03');
  await page.keyboard.press('Space');
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-04');
});
