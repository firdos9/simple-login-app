describe('Login App Tests', () => {

    beforeEach(() => {
      // Opens your login page before each test
      cy.visit('index.html'); // Make sure index.html is in the project root
    });
  
    it('Shows warning for empty fields', () => {
      cy.get('button').click(); // Click the login button
      cy.get('#message').should('contain', 'Please enter both username and password'); // Check the message
    });
  
    it('Shows error for wrong credentials', () => {
      cy.get('#username').type('wrong'); // Type wrong username
      cy.get('#password').type('1234'); // Type wrong password
      cy.get('button').click(); // Click login
      cy.get('#message').should('contain', 'Invalid username or password'); // Check the message
    });
  
    it('Shows success for correct credentials', () => {
      cy.get('#username').type('admin'); // Type correct username
      cy.get('#password').type('1234'); // Type correct password
      cy.get('button').click(); // Click login
      cy.get('#message').should('contain', 'Login Successful'); // Check the message
    });

    it('Shows warning when fields are empty', () => {
      // Click the login button without typing anything
      cy.get('button').click();
      // Check that the message element shows the warning
      cy.get('#message').should('contain', 'Please enter both username and password');
    });
    
  
  });
  