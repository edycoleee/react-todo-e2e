import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should allow to add a new todo', async ({ page }) => {
  });

  test('should mark a todo as completed', async ({ page }) => {
  });

  test('should allow to edit a todo', async ({ page }) => {
  });

  test('should allow to delete a todo', async ({ page }) => {

  });
});

