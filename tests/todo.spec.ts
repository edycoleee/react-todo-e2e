import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should allow to add a new todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'New Todo');
    await page.click('button[type="submit"]');
    const todoText = page.locator('text=New Todo');
    await expect(todoText).toBeVisible();
  });

  test('should mark a todo as completed', async ({ page }) => {
    await page.fill('input[type="text"]', 'New Todo');
    await page.click('button[type="submit"]');
    await page.check('input[type="checkbox"]');
    const todoText = page.locator('text=New Todo');
    await expect(todoText).toHaveCSS('text-decoration', 'line-through solid rgb(0, 0, 0)');
  });

  test('should allow to edit a todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'New Todo');
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Edit")');
    await page.fill('input[type="text"]', 'Updated Todo');
    await page.click('button[type="submit"]');
    const todoText = page.locator('text=Updated Todo');
    await expect(todoText).toBeVisible();
  });

  test('should allow to delete a todo', async ({ page }) => {
    await page.fill('input[type="text"]', 'New Todo');
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Delete")');
    const todoText = page.locator('text=New Todo');
    await expect(todoText).toBeHidden();
  });
});

