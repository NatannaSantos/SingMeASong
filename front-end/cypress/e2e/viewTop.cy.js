describe('Navigate to page Top', () => {    
	it('should see all the videos that are at the top', () => {
		cy.visit('http://localhost:3000');
		cy.contains('Top').click();
		cy.url().should('eq', 'http://localhost:3000/top');
    });
    it('should be in descending order of upvotes', () => {
		
		cy.get('article:first div:last').should('have.text', '1');
		cy.get('article:last div:last').should('have.text', '0');

	});
});