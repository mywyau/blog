import React from 'react';
import { render } from '@testing-library/react';
import LoadingIcon from '../../../src/views/components/LoadingIcon';

describe('LoadingIcon Component', () => {
  it('renders the loading icon', () => {
    const { container } = render(<LoadingIcon />);
    
    const loadingIconDiv = container.querySelector('div.animate-spin');
    
    expect(loadingIconDiv).toBeInTheDocument();
    expect(loadingIconDiv).toHaveClass('rounded-full');
    expect(loadingIconDiv).toHaveClass('h-16');
    expect(loadingIconDiv).toHaveClass('w-16');
    expect(loadingIconDiv).toHaveClass('border-t-4');
    expect(loadingIconDiv).toHaveClass('border-b-4');
    expect(loadingIconDiv).toHaveClass('border-blue-500');
  });

  it('centers the loading icon on the screen', () => {
    const { container } = render(<LoadingIcon />);
    
    const wrapperDiv = container.firstChild;

    expect(wrapperDiv).toHaveClass('flex');
    expect(wrapperDiv).toHaveClass('justify-center');
    expect(wrapperDiv).toHaveClass('items-center');
    expect(wrapperDiv).toHaveClass('h-screen');
  });
});
