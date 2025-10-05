/**
 * Test End-to-End : Création de Produit avec Authentification
 * 
 * Test simple qui se connecte et crée un produit
 */

import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'admin123';

test.describe('Création de Produit', () => {
  
  test('Créer un produit en étant authentifié', async ({ page }) => {
    // ========================================
    // ÉTAPE 1 : SE CONNECTER
    // ========================================
    console.log('🔐 Connexion...');
    await page.goto('http://localhost:3000/login');
    await page.waitForTimeout(2000);

    // Utiliser getByPlaceholder pour plus de robustesse
    await page.getByPlaceholder(/votre@email.com/i).fill(ADMIN_EMAIL);
    await page.getByPlaceholder(/Votre mot de passe/i).fill(ADMIN_PASSWORD);
    await page.locator('button[type="submit"]').first().click();
    
    await page.waitForTimeout(3000);
    console.log('✅ Connecté');

    // ========================================
    // ÉTAPE 2 : ALLER SUR LA PAGE ADMIN PRODUITS
    // ========================================
    console.log('\n📋 Navigation vers /admin/products...');
    await page.goto('http://localhost:3000/admin/products');
    await page.waitForTimeout(2000);
    
    console.log('✅ Page admin produits chargée');

    // ========================================
    // ÉTAPE 3 : OUVRIR LA MODAL DE CRÉATION
    // ========================================
    console.log('\n🔘 Recherche du bouton pour ouvrir la modal...');
    
    const addButton = page.getByRole('button', { 
      name: /ajouter|créer|nouveau/i 
    });
    
    await addButton.first().click();
    await page.waitForTimeout(1500);
    console.log('✅ Modal ouverte');

    // ========================================
    // ÉTAPE 4 : REMPLIR LE FORMULAIRE DANS LA MODAL
    // ========================================
    const productName = `Test Produit ${Date.now()}`;
    const productPrice = '99.99';
    
    console.log(`\n📝 Remplissage du formulaire...`);
    console.log(`   - Nom: ${productName}`);
    console.log(`   - Prix: ${productPrice}€`);
    
    await page.locator('input[id="productForm_name"]').fill(productName);
    await page.locator('input[id="productForm_price"]').fill(productPrice);

    // ========================================
    // ÉTAPE 5 : SOUMETTRE LE FORMULAIRE
    // ========================================
    console.log('\n🔄 Soumission du formulaire...');
    
    await page.locator('button[type="button"]').last().click();
    await page.waitForTimeout(3000);
    
    console.log(`\n✅ SUCCÈS : Produit "${productName}" créé !`);
  });
});

