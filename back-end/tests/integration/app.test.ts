import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import recommendationBodyFactory from "../factories/recommendationBodyFactory.js";

describe("performing integration tests",()=>{
    beforeEach(async ()=>{
        await recommendationService.truncate();
    })

    afterAll(async()=>{
        await prisma.$disconnect();
    })
    it("should persist a recommendation given a valid body", async ()=>{
        const recommendation = recommendationBodyFactory();

    const response = await supertest(app).post("/recommendations").send(recommendation);

    const createRecommendation = await prisma.recommendation.findUnique({
        where:{
            name:recommendation.name
        }
    })
    expect(response.status).toEqual(201);
    expect(createRecommendation).not.toBeNull();
    })

    it("should persist the upvote of a recommendation given it exists", async ()=>{
        const recommendation = recommendationBodyFactory();

    const createdRecommendation = await prisma.recommendation.create({
        data:recommendation
    })
    const response = await supertest(app).post(`/recommendations/${createdRecommendation.id}/upvote`);
    const updatedRecommendation = await prisma.recommendation.findUnique({
        where:{
            name:createdRecommendation.name
        }
    })
    expect(response.status).toEqual(200);
    expect(createdRecommendation.score+1).toEqual(updatedRecommendation.score);
    });

    it("should persist the downvote of a recommendation given it exists", async ()=>{
        const recommendation = recommendationBodyFactory();

    const createdRecommendation = await prisma.recommendation.create({
        data:recommendation
    })
    const response = await supertest(app).post(`/recommendations/${createdRecommendation.id}/downvote`);
    const updatedRecommendation = await prisma.recommendation.findUnique({
        where:{
            name:createdRecommendation.name
        }
    })
    expect(response.status).toEqual(200);
    expect(createdRecommendation.score-1).toEqual(updatedRecommendation.score);
    });

    it("should search for recommendations by id",async ()=>{
        const recommendation = recommendationBodyFactory();

        await prisma.recommendation.create({
            data:recommendation
        })

        const recommendations = await prisma.recommendation.findFirst({
            where:{
                name:recommendation.name
            }
        });

        
        const response = await supertest(app).get(`/recommendations/${recommendations.id}`);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(recommendations);
    });
})