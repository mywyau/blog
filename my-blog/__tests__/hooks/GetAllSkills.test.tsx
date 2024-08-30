// __tests__/GetAllSkills.test.ts

import { renderHook, waitFor } from '@testing-library/react';

import SkillsConnector from '../../src/connectors/SkillsConnector';
import GetAllSkills from '../../src/hooks/GetAllSkills';
import { SkillData } from '../../src/models/SkillData';

jest.mock('../../src/connectors/SkillsConnector');

describe('GetAllSkills hook', () => {
    const mockSkills: SkillData[] = [
        { id: 1, skill_id: "skill-1", skill_name: 'JavaScript', body: 'Advanced' },
        { id: 2, skill_id: "skill-2", skill_name: 'TypeScript', body: 'Intermediate' }
    ];

    it('should return skills data when API call is successful', async () => {
        // Mock the API call to return data
        (SkillsConnector.getAllSkills as jest.Mock).mockResolvedValue({
            data: mockSkills,
            error: null,
        });

        const { result } = renderHook(() => GetAllSkills());

        await waitFor(() => expect(result.current.skills).toEqual(mockSkills));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toBeNull());
    });

    it('should return an error message when API call fails', async () => {
        // Mock the API call to return an error
        (SkillsConnector.getAllSkills as jest.Mock).mockResolvedValue({
            data: null,
            error: 'Failed to fetch skills',
        });

        // Mock the API call to return an error
        (SkillsConnector.getAllSkills as jest.Mock).mockResolvedValue({
            data: null,
            error: 'Failed to fetch skills',
        });

        const { result } = renderHook(() => GetAllSkills());

        await waitFor(() => expect(result.current.skills).toEqual([]));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toBe('Failed to fetch skills'));
    });

    it('should return a hard coded logging error message when no skills data is retrieved', async () => {

        // Mock the API call to return an empty array
        (SkillsConnector.getAllSkills as jest.Mock).mockResolvedValue({
            data: [],
            error: null,
        });

        const { result } = renderHook(() => GetAllSkills());

        await waitFor(() => expect(result.current.skills).toEqual([]));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toBe('[GetAllSkills][getAllSKills] No skills data retrieved, database likely empty'));
    });
});
