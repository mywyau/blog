import axios from 'axios';
import { config } from 'dotenv';
import SkillsConnector from '../../src/connectors/SkillsConnector';
import { SkillData } from '../../src/models/SkillData';
import { DeleteResponseBody } from '../../src/models/DeleteResponseBody';

config({ path: '../../.env' });

const apiUrl = process.env.REACT_APP_API_BASE_URL;

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSkillsConnector = SkillsConnector as jest.Mocked<typeof SkillsConnector>;


const skillsConnector = SkillsConnector

describe('SkillsConnector API functions', () => {

    describe('getSkillById', () => {

        it('should return post data when API call is successful', async () => {

            const mockSkillData: SkillData = {
                id: 1,
                skill_id: 'skill_1',
                skill_name: 'Fake Skill 1',
                body: 'This is a fake skill.',
            };

            mockedAxios.get.mockResolvedValueOnce({ data: mockSkillData });

            const result = await skillsConnector.getSkillById(1);

            expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl + '/blog/skill/retrieve/1');
            expect(result.data).toEqual(mockSkillData);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Skill not found';
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await skillsConnector.getSkillById(1);

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for getViaskill_id
    describe('getViaskill_id', () => {

        it('should return post data when API call is successful', async () => {

            const mockSkillData: SkillData = {
                id: 1,
                skill_id: 'skill_1',
                skill_name: 'Fake Skill 1',
                body: 'This is a fake skill.',
            };

            mockedAxios.get.mockResolvedValueOnce({ data: mockSkillData });

            const result = await skillsConnector.getViaSkillId('mikey-2');

            expect(mockedAxios.get).toHaveBeenCalledWith(apiUrl + '/blog/skill/retrieve/skill-id/mikey-2');
            expect(result.data).toEqual(mockSkillData);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Skill not found';
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await skillsConnector.getViaSkillId('mikey-2');

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for updatePostById
    describe('updatePostById', () => {
        it('should update post data and return the updated data when API call is successful', async () => {

            const mockUpdatedSkillData: SkillData = {
                id: 10,
                skill_id: 'skill_1',
                skill_name: 'Fake Skill 1 New',
                body: 'This is updated fake skill content.',
            };

            mockedAxios.put.mockResolvedValueOnce({ data: mockUpdatedSkillData });


            const result = await skillsConnector.updateSkillById('mikey-2', mockUpdatedSkillData);

            expect(mockedAxios.put).toHaveBeenCalledWith(
                apiUrl + '/blog/skill/update/mikey-2',
                mockUpdatedSkillData
            );
            expect(result.data).toEqual(mockUpdatedSkillData);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Post not found';

            const mockUpdatedSkillData: SkillData = {
                id: 10,
                skill_id: 'skill_1',
                skill_name: 'Fake Skill 1 New',
                body: 'This is updated fake skill content.',
            };

            mockedAxios.put.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await skillsConnector.updateSkillById('mikey-2', mockUpdatedSkillData);
            // const result = await updatePostById('mikey-2', updatedPost);

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });

    // Tests for deleteAllRequest
    describe('deleteAllRequest', () => {

        it('should return a success message when API call is successful', async () => {

            const successMessage: DeleteResponseBody = {
                message: 'All posts have been deleted.',
            };

            mockedAxios.delete.mockResolvedValueOnce({ data: successMessage });

            const result = await skillsConnector.deleteAllRequest();

            expect(mockedAxios.delete).toHaveBeenCalledWith(apiUrl + '/blog/skill/all');
            expect(result.data).toEqual(successMessage);
            expect(result.error).toBeUndefined();
        });

        it('should return an error message when API call fails', async () => {

            const errorMessage = 'Failed to delete posts';

            mockedAxios.delete.mockRejectedValueOnce({
                response: {
                    data: { message: errorMessage },
                },
            });

            const result = await skillsConnector.deleteAllRequest();

            expect(result.data).toBeUndefined();
            expect(result.error).toBe(errorMessage);
        });
    });
});
