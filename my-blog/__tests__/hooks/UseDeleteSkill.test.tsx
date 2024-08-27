// __tests__/UseDeleteSkill.test.ts

import { act, renderHook } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import SkillsConnector from '../../src/connectors/SkillsConnector';
import UseDeleteSkill from '../../src/hooks/UseDeleteSkill';
import { DeleteResponseBody } from '../../src/models/DeleteResponseBody';


jest.mock('../../src/connectors/SkillsConnector');

describe('UseDeleteSkill hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should cancel deletion if user does not confirm', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    const { result } = renderHook(() => UseDeleteSkill('skill-123'));

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this skill? skill-123");
    expect(result.current.loadingState).toEqual(some(false)); // Loading should remain false
    expect(result.current.deleteErrorMessage).toEqual(none);
    expect(result.current.deleteResponseBody).toEqual(none);
  });

  it('should set loading and delete skill when confirmed', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const mockResponse: DeleteResponseBody = { message: "some delete response" };
    (SkillsConnector.deleteSkill as jest.Mock).mockResolvedValue({ data: mockResponse, error: null });

    const { result } = renderHook(() => UseDeleteSkill('skill-123'));

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this skill? skill-123");

    expect(result.current.loadingState).toEqual(some(false)); // After the API call, loading should be false
    expect(result.current.deleteResponseBody).toEqual(some(mockResponse)); // Should return successful response
    expect(result.current.deleteErrorMessage).toEqual(none);
  });

  it('should handle error during deletion', async () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const mockError = 'Error deleting the skill';
    (SkillsConnector.deleteSkill as jest.Mock).mockResolvedValue({ data: null, error: mockError });

    const { result } = renderHook(() => UseDeleteSkill('skill-123'));
    await act(async () => {
      await result.current.handleDelete();
    });

    expect(confirmSpy).toHaveBeenCalledWith("Are you sure you want to delete this skill? skill-123");

    expect(result.current.loadingState).toEqual(some(false)); // After the API call, loading should be false
    expect(result.current.deleteErrorMessage).toEqual(some(mockError)); // Error should be set
    expect(result.current.deleteResponseBody).toEqual(none); // No data should be set
  });
});
