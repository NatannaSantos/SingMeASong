import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import recommendationBodyFactory from "../factories/recommendationBodyFactory";
import {jest} from "@jest/globals";
import { conflictError } from "../../src/utils/errorUtils";

describe("recommendation service unit test",()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
        jest.resetAllMocks();
    })
    it("should return conflict error given name is duplicate",async ()=>{
        const duplicateRecommendation = recommendationBodyFactory();

        jest.spyOn(recommendationRepository,"findByName").mockResolvedValueOnce({id:1,score:0, ...duplicateRecommendation})

        expect(async ()=>{

        await recommendationService.insert(duplicateRecommendation);
        }).rejects.toEqual(conflictError("Recommendations names must be unique"))
    })

    it('should remove the music where the score is -5', async () => {
		const body = recommendationBodyFactory();
		jest.spyOn(recommendationRepository, 'find').mockResolvedValue({id:1,score:0,...body})

		jest
			.spyOn(recommendationRepository, 'updateScore')
			.mockResolvedValue({id:1,score:-5,...body})
		
		const remove = jest
			.spyOn(recommendationRepository, 'remove')
			.mockResolvedValue(null);

		await recommendationService.downvote(1)

		expect(remove).toBeCalled();
	});
});