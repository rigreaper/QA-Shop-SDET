import { test, expect } from '@playwright/test';
import { loginTestData } from '../../data/test-data';

test.beforeEach(async ({ page }) => {

  await page.goto('https://learnqa.dev/en/qa-shop');

  await page.getByTestId('giris-ac').click();

});


test('The user logs in with valid credentials.', async ({ page }) => {



  const emailInput = page.getByTestId('giris-eposta');
  const passwordInput = page.getByTestId('giris-parola');
  const signOutButton = page.getByTestId('cikis-yap');

  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();

  await emailInput.fill(loginTestData.validUser.email);
  await passwordInput.fill(loginTestData.validUser.password);

  await expect(emailInput).toHaveValue(loginTestData.validUser.email);
  await expect(passwordInput).toHaveValue(loginTestData.validUser.password);

  await page.getByTestId('giris-yap').click();


  await expect(signOutButton).toBeVisible();

});


test('should reject login when password is invalid', async ({ page }) => {

    

    const emailInput = page.getByTestId('giris-eposta');
    const passwordInput = page.getByTestId('giris-parola');
    const errorNotify = page.getByTestId('bildirim');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(loginTestData.invalidPassword.email);
    await passwordInput.fill(loginTestData.invalidPassword.password);

    await expect(emailInput).toHaveValue(loginTestData.invalidPassword.email);
    await expect(passwordInput).toHaveValue(loginTestData.invalidPassword.password);

    await page.getByTestId('giris-yap').click();

    await expect(errorNotify).toBeVisible();

    await expect(page.getByTestId('cikis-yap')).not.toBeVisible()

});

test('should reject login when email is invalid', async ({ page }) => {

    

    const emailInput = page.getByTestId('giris-eposta');
    const passwordInput = page.getByTestId('giris-parola');
    const errorNotify = page.getByTestId('bildirim');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(loginTestData.invalidEmail.email);
    await passwordInput.fill(loginTestData.invalidEmail.password);

    await expect(emailInput).toHaveValue(loginTestData.invalidEmail.email);
    await expect(passwordInput).toHaveValue(loginTestData.invalidEmail.password);

    await page.getByTestId('giris-yap').click();

    await expect(errorNotify).toBeVisible();

    await expect(page.getByTestId('cikis-yap')).not.toBeVisible();

});

test('should reject login when email and password is invalid', async ({ page }) => {

   

    const emailInput = page.getByTestId('giris-eposta');
    const passwordInput = page.getByTestId('giris-parola');
    const errorNotify = page.getByTestId('bildirim');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(loginTestData.invalidBoth.email);
    await passwordInput.fill(loginTestData.invalidBoth.password);

    await expect(emailInput).toHaveValue(loginTestData.invalidBoth.email);
    await expect(passwordInput).toHaveValue(loginTestData.invalidBoth.password);

    await page.getByTestId('giris-yap').click();

    await expect(errorNotify).toBeVisible();

    await expect(page.getByTestId('cikis-yap')).not.toBeVisible();

});


test('should reject login when both field is empty', async ({ page }) => {

    

    const emailInput = page.getByTestId('giris-eposta');
    const passwordInput = page.getByTestId('giris-parola');
    const errorNotify = page.getByTestId('bildirim');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await emailInput.fill(loginTestData.emptyCredentials.email);
    await passwordInput.fill(loginTestData.emptyCredentials.password);

    await expect(emailInput).toHaveValue(loginTestData.emptyCredentials.email);
    await expect(passwordInput).toHaveValue(loginTestData.emptyCredentials.password);

    await page.getByTestId('giris-yap').click();

    await expect(errorNotify).toBeVisible();

    await expect(page.getByTestId('cikis-yap')).not.toBeVisible();

});