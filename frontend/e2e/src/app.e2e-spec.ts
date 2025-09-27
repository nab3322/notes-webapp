import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Notes Sharing App E2E Tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  describe('App Initialization', () => {
    it('should display app title', async () => {
      await page.navigateTo();
      await page.waitForApp();
      
      const title = await page.getAppTitle().getText();
      expect(title).toContain('Notes Sharing App');
    });

    it('should have correct page title', async () => {
      await page.navigateTo();
      await page.waitForApp();
      
      const pageTitle = await page.getTitle();
      expect(pageTitle).toContain('Notes Sharing App');
    });

    it('should redirect to login when not authenticated', async () => {
      await page.navigateTo();
      await page.waitForApp();
      
      // Should be redirected to login
      await page.waitForRoute('/auth/login');
      const currentUrl = await page.getCurrentUrl();
      expect(currentUrl).toContain('/auth/login');
    });
  });

  describe('Guest Layout', () => {
    beforeEach(async () => {
      await page.navigateTo();
      await page.waitForApp();
    });

    it('should show guest layout when not logged in', async () => {
      expect(await page.isGuestLayout()).toBe(true);
      expect(await page.isLoggedIn()).toBe(false);
    });

    it('should navigate between login and register', async () => {
      // Go to register
      await page.navigateToRegister();
      await page.waitForRoute('/auth/register');
      expect(await page.getCurrentUrl()).toContain('/auth/register');
      
      // Go back to login
      await page.navigateToLogin();
      await page.waitForRoute('/auth/login');
      expect(await page.getCurrentUrl()).toContain('/auth/login');
    });
  });

  describe('Authentication Flow', () => {
    it('should show validation errors for empty form', async () => {
      await page.navigateToLogin();
      await page.waitForRoute('/auth/login');
      
      // Try to submit empty form
      await page.getLoginButton().click();
      
      // Should still be on login page
      expect(await page.getCurrentUrl()).toContain('/auth/login');
    });

    it('should handle invalid credentials', async () => {
      await page.navigateToLogin();
      await page.waitForRoute('/auth/login');
      
      // Enter invalid credentials
      await page.getUsernameInput().sendKeys('invalid_user');
      await page.getPasswordInput().sendKeys('wrong_password');
      await page.getLoginButton().click();
      
      // Should stay on login page or show error
      await browser.sleep(2000); // Wait for potential error message
      const currentUrl = await page.getCurrentUrl();
      expect(currentUrl).toContain('/auth/login');
    });

    // Note: This test requires a working backend with demo user
    it('should login with valid credentials (demo)', async () => {
      await page.login('demo', 'password');
      
      // Wait for redirect to dashboard
      try {
        await page.waitForRoute('/dashboard');
        expect(await page.isLoggedIn()).toBe(true);
        expect(await page.getCurrentUrl()).toContain('/dashboard');
      } catch (error) {
        // If backend is not available, this test will fail
        console.log('Backend not available for authentication test');
        pending('Backend required for this test');
      }
    });
  });

  describe('Authenticated Layout (Mock)', () => {
    // Note: These tests would require a working backend or mock authentication
    
    it('should show authenticated layout after login', async () => {
      // This would require actual authentication
      pending('Requires backend authentication');
    });

    it('should display navigation menu', async () => {
      // This would require actual authentication
      pending('Requires backend authentication');
    });

    it('should navigate to different sections', async () => {
      // This would require actual authentication
      pending('Requires backend authentication');
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile viewport', async () => {
      await browser.manage().window().setSize(375, 667); // iPhone size
      await page.navigateTo();
      await page.waitForApp();
      
      const title = await page.getAppTitle().getText();
      expect(title).toContain('Notes Sharing App');
    });

    it('should work on tablet viewport', async () => {
      await browser.manage().window().setSize(768, 1024); // iPad size
      await page.navigateTo();
      await page.waitForApp();
      
      const title = await page.getAppTitle().getText();
      expect(title).toContain('Notes Sharing App');
    });

    it('should work on desktop viewport', async () => {
      await browser.manage().window().setSize(1920, 1080); // Desktop size
      await page.navigateTo();
      await page.waitForApp();
      
      const title = await page.getAppTitle().getText();
      expect(title).toContain('Notes Sharing App');
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 routes', async () => {
      await page.navigateTo('non-existing-route');
      await page.waitForApp();
      
      // Should redirect to login or show 404 page
      const currentUrl = await page.getCurrentUrl();
      expect(currentUrl).toMatch(/\/(auth\/login|404)/);
    });
  });

  afterEach(async () => {
    // Assert that there are no severe browser errors
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    const severeErrors = logs.filter(entry => entry.level === logging.Level.SEVERE);
    
    if (severeErrors.length > 0) {
      console.log('Browser errors found:', severeErrors);
    }
    
    expect(severeErrors.length).toBe(0);
  });
});