import { browser, by, element, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';

export class AppPage {
  // Navigation methods
  async navigateTo(path: string = ''): Promise<unknown> {
    return browser.get(browser.baseUrl + path);
  }

  async navigateToLogin(): Promise<unknown> {
    return this.navigateTo('auth/login');
  }

  async navigateToRegister(): Promise<unknown> {
    return this.navigateTo('auth/register');
  }

  async navigateToDashboard(): Promise<unknown> {
    return this.navigateTo('dashboard');
  }

  async navigateToNotes(): Promise<unknown> {
    return this.navigateTo('notes');
  }

  // Wait methods
  async waitForApp(): Promise<void> {
    await browser.wait(
      ExpectedConditions.presenceOf(element(by.css('app-root'))),
      10000,
      'App should load within 10 seconds'
    );
  }

  async waitForRoute(route: string): Promise<void> {
    await browser.wait(
      () => browser.getCurrentUrl().then(url => url.includes(route)),
      5000,
      `Should navigate to ${route} within 5 seconds`
    );
  }

  // Element getters
  getAppTitle(): ElementFinder {
    return element(by.css('app-root h1, .app-title h1'));
  }

  getLoadingBar(): ElementFinder {
    return element(by.css('mat-progress-bar'));
  }

  getErrorMessage(): ElementFinder {
    return element(by.css('.error-message, .mat-error'));
  }

  getSnackBar(): ElementFinder {
    return element(by.css('snack-bar-container, .mat-snack-bar-container'));
  }

  // Authentication elements
  getUsernameInput(): ElementFinder {
    return element(by.css('input[formControlName="username"]'));
  }

  getPasswordInput(): ElementFinder {
    return element(by.css('input[formControlName="password"]'));
  }

  getLoginButton(): ElementFinder {
    return element(by.css('button[type="submit"]'));
  }

  getLogoutButton(): ElementFinder {
    return element(by.css('button:contains("Logout"), button:contains("logout")'));
  }

  // Layout elements
  getHeader(): ElementFinder {
    return element(by.css('mat-toolbar, .app-header'));
  }

  getSidebar(): ElementFinder {
    return element(by.css('mat-sidenav, .app-sidebar'));
  }

  getMenuButton(): ElementFinder {
    return element(by.css('.menu-button, button[mat-icon-button]:contains("menu")'));
  }

  getUserMenu(): ElementFinder {
    return element(by.css('.user-button, .user-menu'));
  }

  // Notes elements
  getNotesList(): ElementArrayFinder {
    return element.all(by.css('.note-card, .note-item'));
  }

  getCreateNoteButton(): ElementFinder {
    return element(by.css('.create-note-btn, button[mat-fab], .fab-button'));
  }

  getNoteEditor(): ElementFinder {
    return element(by.css('app-note-editor, .note-editor'));
  }

  // Status check methods
  async isLoggedIn(): Promise<boolean> {
    try {
      const authenticatedLayout = element(by.css('.authenticated-layout'));
      return await authenticatedLayout.isPresent();
    } catch {
      return false;
    }
  }

  async isGuestLayout(): Promise<boolean> {
    try {
      const guestLayout = element(by.css('.guest-layout'));
      return await guestLayout.isPresent();
    } catch {
      return false;
    }
  }

  async isSidebarOpen(): Promise<boolean> {
    try {
      const sidebar = this.getSidebar();
      const classes = await sidebar.getAttribute('class');
      return classes.includes('mat-drawer-opened') || classes.includes('open');
    } catch {
      return false;
    }
  }

  // Action methods
  async login(username: string, password: string): Promise<void> {
    await this.navigateToLogin();
    await this.getUsernameInput().sendKeys(username);
    await this.getPasswordInput().sendKeys(password);
    await this.getLoginButton().click();
  }

  async logout(): Promise<void> {
    // Try to click user menu first
    try {
      await this.getUserMenu().click();
      await browser.sleep(500);
    } catch {
      // Menu might already be open or not exist
    }
    
    await this.getLogoutButton().click();
  }

  async toggleSidebar(): Promise<void> {
    await this.getMenuButton().click();
  }

  async createNote(title: string, content: string): Promise<void> {
    await this.getCreateNoteButton().click();
    
    // Wait for editor to open
    await browser.wait(
      ExpectedConditions.presenceOf(this.getNoteEditor()),
      5000
    );
    
    // Fill in note details
    await element(by.css('input[formControlName="title"]')).sendKeys(title);
    await element(by.css('textarea[formControlName="content"]')).sendKeys(content);
    
    // Save note
    await element(by.css('button[type="submit"], .save-button')).click();
  }

  // Utility methods
  async getText(selector: string): Promise<string> {
    return element(by.css(selector)).getText();
  }

  async isPresent(selector: string): Promise<boolean> {
    return element(by.css(selector)).isPresent();
  }

  async isDisplayed(selector: string): Promise<boolean> {
    return element(by.css(selector)).isDisplayed();
  }

  async clickElement(selector: string): Promise<void> {
    await element(by.css(selector)).click();
  }

  async getCurrentUrl(): Promise<string> {
    return browser.getCurrentUrl();
  }

  async getTitle(): Promise<string> {
    return browser.getTitle();
  }

  async refreshPage(): Promise<void> {
    await browser.refresh();
  }

  async takeScreenshot(): Promise<string> {
    return browser.takeScreenshot();
  }
}