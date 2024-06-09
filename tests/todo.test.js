// tests/todo.test.js
import { test, expect } from '@playwright/test';

//jalankan test  npx playwright test
test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173'); // Adjust the URL to match your development server
  });

  //1. test header
  test('should display the correct title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Todo App');
  });

  //2. test add todo
  test('should add a new todo', async ({ page }) => {
    await page.fill('input[placeholder="Add a new todo"]', 'New Todo');
    await page.click('button:has-text("Submit")');
    await expect(page.locator('span')).toHaveText('New Todo');
  });

  //5. test checked todo
  test('should toggle a todo', async ({ page }) => {
    await page.fill('input[placeholder="Add a new todo"]', 'New Todo');
    await page.click('button:has-text("Submit")');
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  });

  //3. test delete todo
  test('should delete a todo', async ({ page }) => {
    await page.fill('input[placeholder="Add a new todo"]', 'Belajar');
    await page.click('button:has-text("Submit")');
    await page.click('button:has-text("Delete")');
    await expect(page.locator(`span:has-text("Belajar")`)).toBeHidden();
  });

  //4. test delete todo
  test('should edit a todo', async ({ page }) => {
    await page.fill('input[placeholder="Add a new todo"]', 'Belajar');
    await page.click('button:has-text("Submit")');
    await page.click('button:has-text("Edit")');
    await page.fill('input[placeholder="Add a new todo"]', 'Updated Makan');
    await page.click('button:has-text("Submit")');
    await expect(page.locator('span')).toHaveText('Updated Makan');
  });
});
