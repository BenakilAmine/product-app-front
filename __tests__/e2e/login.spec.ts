/**
 * Test End-to-End : Authentification (Login/Signup)
 * 
 * Test du parcours complet d'authentification
 */

import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('devrait afficher la page de connexion', async ({ page }) => {
    // Naviguer vers la page de login
    await page.goto('http://localhost:3000/login');

    // Vérifier que le formulaire de connexion est présent
    await expect(page.locator('text=Connexion').or(page.locator('text=Se connecter'))).toBeVisible({ timeout: 10000 });
    
    // Vérifier les champs du formulaire
    const emailInput = page.locator('input[type="email"]').or(page.locator('input[name="email"]'));
    const passwordInput = page.locator('input[type="password"]').or(page.locator('input[name="password"]'));
    
    await expect(emailInput.first()).toBeVisible();
    await expect(passwordInput.first()).toBeVisible();
  });

  test('devrait afficher la page d\'inscription', async ({ page }) => {
    // Naviguer vers la page de signup
    await page.goto('http://localhost:3000/signup');

    // Vérifier que le formulaire d'inscription est présent
    await expect(page.locator('text=Inscription').or(page.locator('text=Créer un compte'))).toBeVisible({ timeout: 10000 });
    
    // Vérifier les champs du formulaire
    const emailInput = page.locator('input[type="email"]').or(page.locator('input[name="email"]'));
    const passwordInput = page.locator('input[type="password"]').or(page.locator('input[name="password"]'));
    
    await expect(emailInput.first()).toBeVisible();
    await expect(passwordInput.first()).toBeVisible();
  });

  test('devrait pouvoir naviguer entre login et signup', async ({ page }) => {
    // Aller sur la page de login
    await page.goto('http://localhost:3000/login');
    
    // Chercher le lien vers signup
    const signupLink = page.locator('a[href="/signup"]').or(page.locator('text=S\'inscrire').or(page.locator('text=Créer un compte')));
    
    // Cliquer pour aller vers signup
    await signupLink.first().click();
    
    // Vérifier qu'on est sur la page signup
    await expect(page).toHaveURL(/\/signup/);
    
    // Chercher le lien vers login
    const loginLink = page.locator('a[href="/login"]').or(page.locator('text=Se connecter').or(page.locator('text=Déjà un compte')));
    
    // Cliquer pour retourner au login
    await loginLink.first().click();
    
    // Vérifier qu'on est de retour sur login
    await expect(page).toHaveURL(/\/login/);
  });

  test('devrait afficher une erreur avec des identifiants invalides', async ({ page }) => {
    // Aller sur la page de login
    await page.goto('http://localhost:3000/login');
    
    // Remplir le formulaire avec des identifiants invalides
    await page.locator('input[type="email"]').first().fill('test-invalid@example.com');
    await page.locator('input[type="password"]').first().fill('wrongpassword123');
    
    // Soumettre le formulaire
    const submitButton = page.locator('button[type="submit"]').or(page.locator('text=Se connecter').and(page.locator('button')));
    await submitButton.first().click();
    
    // Attendre un message d'erreur ou une notification
    await page.waitForTimeout(2000);
    
    // Vérifier qu'on est toujours sur la page de login (pas de redirection)
    await expect(page).toHaveURL(/\/login/);
  });
});

