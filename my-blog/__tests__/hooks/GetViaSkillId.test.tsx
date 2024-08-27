// __tests__/GetViaSkillId.test.ts

import { renderHook, waitFor } from '@testing-library/react';

import { none, some } from 'fp-ts/lib/Option';
import { useParams } from 'react-router-dom';
import SkillsConnector from '../../src/connectors/SkillsConnector';
import GetViaSkillId from '../../src/hooks/GetViaSkillId';
import { SkillData } from '../../src/models/SkillData';

jest.mock('../../src/connectors/SkillsConnector');
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

describe('GetViaSkillId hook', () => {
    const mockSkills: SkillData =
        { id: 1, skill_id: "skill-1", skill_name: 'JavaScript', body: 'Advanced' };

    it('should return skills data when API call is successful', async () => {
        // Mock the API call to return data
        (useParams as jest.Mock).mockReturnValue({ id: '123' });

        (SkillsConnector.getViaSkillId as jest.Mock).mockResolvedValue({
            data: mockSkills,
            error: null,
        });

        const { result } = renderHook(() => GetViaSkillId());

        await waitFor(() => expect(result.current.sqlSkillData).toEqual(some(mockSkills)));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toEqual(none));
    });

    it('should return an error message when API call fails', async () => {

        (useParams as jest.Mock).mockReturnValue({ id: '123' });

        // Mock the API call to return an error
        (SkillsConnector.getViaSkillId as jest.Mock).mockResolvedValue({
            data: none,
            error: 'Failed to fetch skills',
        });

        const { result } = renderHook(() => GetViaSkillId());

        await waitFor(() => expect(result.current.sqlSkillData).toEqual(none));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toEqual(some('Failed to fetch skills')));
    });

    it('should return a hard coded logging error message when no skills data is retrieved', async () => {

        (useParams as jest.Mock).mockReturnValue({ id: '123' });

        // Mock the API call to return an empty array
        (SkillsConnector.getViaSkillId as jest.Mock).mockResolvedValue({
            data: null,
            error: null,
        });

        const { result } = renderHook(() => GetViaSkillId());

        await waitFor(() => expect(result.current.sqlSkillData).toEqual(none));
        await waitFor(() => expect(result.current.getAllSkillErrorMessage).toEqual(none));
    });
});
