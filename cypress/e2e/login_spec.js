describe('Login flow (E2E) - consistent messaging', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/login').as('loginReq');
    cy.visit('/');
  });

  it('shows warning on empty submit', () => {
    cy.get('#loginBtn').click();
    cy.get('#message', { timeout: 6000 })
      .should('be.visible')
      .and('have.text', 'Please enter both username and password');
  });

  it('shows error for wrong credentials (server + UI match)', () => {
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpass');
    cy.get('#loginBtn').click();

    cy.wait('@loginReq').then((interception) => {
      // assert server responded with an error code (e.g., 401)
      expect(interception.response.statusCode).to.be.oneOf([400, 401, 403]);

      const serverMsg = interception.response.body.message;
      expect(serverMsg).to.be.a('string').and.to.not.be.empty;

      // UI should show exactly the same server message
      cy.get('#message', { timeout: 6000 }).should('have.text', serverMsg);
    });
  });

  it('logs in with correct credentials (server + UI match)', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('1234');
    cy.get('#loginBtn').click();

    cy.wait('@loginReq').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      const serverMsg = interception.response.body.message;
      expect(serverMsg).to.equal('Login Successful');

      // UI should show exactly the server message
      cy.get('#message', { timeout: 6000 }).should('have.text', serverMsg);
    });
  });
});

