import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AssetsPage from '../../../src/views/pages/AssetsPage';

// Mock the components that are not the focus of this test
jest.mock('../../../src/views/components/Copyright', () => () => <div>Copyright Mock</div>);
jest.mock('../../../src/views/components/navigation_bar/AssetsNavigationBar', () => () => <div>Assets Navigation Bar Mock</div>);

describe('AssetsPage Component', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers for the test suite
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
  });

  it('renders the loading state initially', () => {
    render(<AssetsPage />);
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders the main content after loading completes', async () => {
    render(<AssetsPage />);

    // Advance the timers by 2000ms (the same duration as the setTimeout in useEffect)
    jest.advanceTimersByTime(2000);

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    // Check if the main content is rendered
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Assets');
    expect(screen.getByText('Assets Navigation Bar Mock')).toBeInTheDocument();
    expect(screen.getByText('Copyright Mock')).toBeInTheDocument();
  });
});
