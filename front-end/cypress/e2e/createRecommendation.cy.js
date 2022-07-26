import {faker} from "@faker-js/faker";

describe("Create Recommendation",()=>{
    it("should create a recommendation given valid input", ()=>{
        const recommendation = {
            name: faker.lorem.words(2),
            youtubeLink:"https://www.youtube.com/watch?v=kgx4WGK0oNU"
        };

        cy.visit("http://localhost:3000");

        cy.get('input[placeholder="Name"]').type(recommendation.name);
        cy.get('input[placeholder="https://youtu.be/..."]').type(recommendation.youtubeLink);
    });
});