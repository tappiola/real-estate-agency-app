const loginData = {
    name: 'John Smith',
    email: `john.smith${Date.now()}@test.com`,
    password: '123456'
};

describe('Registration and login', () => {
    it('register and login', () => {
        cy.visit('/');
        cy.get('[data-cy="login"]').as('login').click();
        cy.get('[data-cy="register-link"]').click();
        cy.get('[name="name"]').type(loginData.name);
        cy.get('[name="email"]').type(loginData.email);
        cy.get('[name="password"]').type(loginData.password);
        cy.get('[data-cy="register-button"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);

        cy.get('@login').click();
        cy.get('[name="email"]').type(loginData.email);
        cy.get('[name="password"]').type(loginData.password);
        cy.get('[data-cy="login-button"]').click();
        cy.get('[data-cy="logout"]').should('exist');
    });
});
