describe('Navigate to page Top', () => {
	it('should see all the videos that are at the top', () => {
		cy.visit('http://localhost:3000');
		cy.contains('Top').click();
		cy.url().should('eq', 'http://localhost:3000/top');
    });
});