import {faker} from "@faker-js/faker";
import { CreateRecommendationData } from "../../src/services/recommendationsService";

export default function recommendationBodyFactory(): CreateRecommendationData{
    return {
        name: faker.lorem.words(2),
        youtubeLink: "https://www.youtube.com/watch?v=kgx4WGK0oNU"
    };
}