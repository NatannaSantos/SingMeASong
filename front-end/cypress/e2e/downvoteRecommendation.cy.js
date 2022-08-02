describe("downvote Recommendation", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:5000/reset", {});
        cy.request("POST", "http://localhost:5000/seed", {});
    });
    it("should increase the vote count", () => {
       

        cy.visit("http://localhost:3000");

        cy.intercept("POST", "http://localhost:5000/recommendations/*/upvote").as("downvoteRecommendation");

        cy.get('svg[data-test-id="downvote-button"]').click();
        cy.wait("@downvoteRecommendation");
        cy.get('[data-test-id="upvote-row"]').contains('0');
        
    });

    
});

