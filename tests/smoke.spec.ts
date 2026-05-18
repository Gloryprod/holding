import { test, expect } from '@playwright/test';

test('Vérification des piliers de la Holding', async ({ page }) => {
  // 1. Accueil
  await page.goto('http://localhost:3001');
  
  // Attendre que la page soit chargée
  await expect(page).toHaveURL('http://localhost:3001');

  // 2. Vérifier le mot clé avec une Regex insensible à la casse (/i)
  // On cible spécifiquement le texte au lieu de tout le body
  await expect(page.getByText(/eden/i).first()).toBeVisible();

  // 3. Test de clic (recommandé pour valider le fonctionnement)
  const link = page.getByRole('link', { name: /à propos/i });
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/.*about/);
});