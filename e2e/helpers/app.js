const {
	device, expect, element, by, waitFor
} = require('detox');
const data = require('../data');

async function addServer() {
    await waitFor(element(by.id('onboarding-view'))).toBeVisible().withTimeout(2000);
    await element(by.id('connect-server-button')).tap();
    await waitFor(element(by.id('new-server-view'))).toBeVisible().withTimeout(60000);
    await expect(element(by.id('new-server-view'))).toBeVisible();
    await element(by.id('new-server-view-input')).replaceText(data.server);
    await element(by.id('new-server-view-button')).tap();
}

async function navigateToLogin() {
    await addServer();
    await waitFor(element(by.id('welcome-view'))).toBeVisible().withTimeout(2000);
    await element(by.id('welcome-view-login')).tap();
    await waitFor(element(by.id('login-view'))).toBeVisible().withTimeout(2000);
}

async function login() {
    await waitFor(element(by.id('login-view'))).toBeVisible().withTimeout(2000);
    await element(by.id('login-view-email')).replaceText(data.user);
    await element(by.id('login-view-password')).replaceText(data.password);
    await element(by.id('login-view-submit')).tap();
    await waitFor(element(by.id('rooms-list-view'))).toBeVisible().withTimeout(10000);
}

async function logout() {
    await element(by.id('rooms-list-view-sidebar')).tap();
    await waitFor(element(by.id('sidebar'))).toBeVisible().withTimeout(2000);
	await waitFor(element(by.id('sidebar-logout'))).toBeVisible().withTimeout(2000);
    await element(by.id('sidebar-logout')).tap();
    await waitFor(element(by.id('onboarding-view'))).toBeVisible().withTimeout(2000);
    await expect(element(by.id('onboarding-view'))).toBeVisible();
}

async function tapBack(label) {
    try {
      return element(by.traits(['button']).and(by.label(label || 'Back'))).atIndex(0).tap();
    } catch (err) {
      return element(by.type('_UIModernBarButton').and(by.label(label || 'Back'))).tap();
    }
}

async function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

module.exports = {
    addServer,
    navigateToLogin,
    login,
    logout,
    tapBack,
    sleep
};