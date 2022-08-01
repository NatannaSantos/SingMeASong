import {faker} from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { CreateRecommendationData, recommendationService } from "../../src/services/recommendationsService.js";

describe("performing integration tests",()=>{
    beforeEach(async ()=>{
        await recommendationService.truncate();
    })

    afterAll(async()=>{
        await prisma.$disconnect();
    })
    it("should persist a recommendation given a valid body", async ()=>{
        const recommendation: CreateRecommendationData = {
            name: faker.lorem.words(2),
            youtubeLink: "https://www.youtube.com/watch?v=kgx4WGK0oNU"
        };

    const response = await supertest(app).post("/recommendations").send(recommendation);

    const createRecommendation = await prisma.recommendation.findUnique({
        where:{
            name:recommendation.name
        }
    })
    expect(response.status).toEqual(201);
    expect(createRecommendation).not.toBeNull();
    })
})