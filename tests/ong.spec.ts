import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://ong-eden-benin.localhost:3001/');
  await page.getByRole('link', { name: 'À propos' }).click();
  await page.getByRole('link', { name: 'Pourquoi investir ?' }).click();
  await page.getByText('Quatre piliers qui font de').click();
  await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click();
  await page.getByRole('button', { name: 'Changer de thème' }).click();
  await page.getByText('ONG EDEN-BÉNINÀ').click();
  await page.getByText('Innover pour la résilience').click();
  await page.getByText('NavigationAccueilNos').click();
});