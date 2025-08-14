// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test('should login successfully', async ({ page }) => {
  await page.goto('/');
  
  // Fill login form
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.fill('[data-testid="password-input"]', 'test123');
  await page.click('[data-testid="login-btn"]');
  
  // Check if logged in
  await expect(page.locator('[data-testid="welcome-title"]')).toBeVisible();
  await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
});

test('should show error for invalid credentials', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('[data-testid="email-input"]', 'wrong@example.com');
  await page.fill('[data-testid="password-input"]', 'wrongpass');
  await page.click('[data-testid="login-btn"]');
  
  await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
});