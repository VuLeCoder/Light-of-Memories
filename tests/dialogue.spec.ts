import { test, expect } from '@playwright/test';

test('story waits for confirmation, ignores held keys and pauses in the menu', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  const dialogue = page.locator('.dialogue');
  await expect(dialogue).toHaveAttribute('data-line', 'earth-01');
  await page.keyboard.down('Space');
  await expect(dialogue).toHaveAttribute('data-complete', 'true');
  await page.keyboard.down('Space');
  await page.keyboard.down('Space');
  await page.keyboard.up('Space');
  await expect(dialogue).toHaveAttribute('data-line', 'earth-01');
  await page.getByRole('heading', { name: 'Sách đồng hành' }).click();
  await expect(dialogue).toHaveAttribute('data-line', 'earth-01');
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await expect(dialogue).toBeHidden();
  await page.getByRole('button', { name: 'Tiếp tục', exact: true }).click();
  await expect(dialogue).toHaveAttribute('data-line', 'earth-01');
  await page.keyboard.press('Enter');
  await expect(dialogue).toHaveAttribute('data-line', 'earth-02');
  for (let i = 2; i <= 6; i++) {
    await expect(dialogue).toHaveAttribute('data-line', `earth-0${i}`);
    if (i === 3) await expect(page.getByRole('img', { name: 'Chân dung An' })).toBeVisible();
    if (i === 4 || i === 5) await expect(page.getByRole('img', { name: 'Chân dung Bà' })).toBeVisible();
    await expect(dialogue).toHaveAttribute('data-complete', 'true');
    await page.getByRole('button', { name: i === 6 ? 'Theo ánh trăng' : 'Tiếp theo', exact: false }).click();
  }
  await expect(page.locator('.game-host')).toHaveAttribute('data-scene', 'moon');
  await expect(dialogue).toHaveAttribute('data-line', 'moon-01');
  for (const id of ['moon-01', 'moon-02']) {
    await expect(dialogue).toHaveAttribute('data-line', id);
    await expect(dialogue).toHaveAttribute('data-complete', 'true');
    await dialogue.locator('.dialogue-next').click();
  }
  await expect(page.getByText('Di chuyển bằng A/D', { exact: false })).toBeVisible();
});

test('restart resets the story and skip goes to the moon', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.locator('.dialogue-next').click();
  await page.locator('.dialogue-next').click();
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'earth-02');
  await page.getByRole('button', { name: '☰ Menu' }).click();
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await page.getByRole('button', { name: 'Bắt đầu lại', exact: true }).click();
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'earth-01');
  await page.getByRole('button', { name: 'Bỏ qua mở đầu' }).click();
  await expect(page.locator('.game-host')).toHaveAttribute('data-scene', 'moon');
  await expect(page.locator('.dialogue')).toHaveAttribute('data-line', 'moon-01');
});
