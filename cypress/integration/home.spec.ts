describe('Home', () => {
  beforeEach(() => cy.visit('http://localhost:3000'));

  it('shows greeting', () => {
    cy.get('h1').should('have.text', 'Hello, world!');
  });
});
