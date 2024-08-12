import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../src/views/components/navigation_bar/NavBar';


describe('Navbar', () => {
  test('renders Home link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders About link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const aboutLink = screen.getByText(/About/i);
    expect(aboutLink).toBeInTheDocument();
  });

  test('renders Contact link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const contactLink = screen.getByText(/Contact/i);
    expect(contactLink).toBeInTheDocument();
  });

  test('renders Interests link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const interestsLink = screen.getByText(/Interests/i);
    expect(interestsLink).toBeInTheDocument();
  });

  test('renders Skills link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const skillsLink = screen.getByText(/Skills/i);
    expect(skillsLink).toBeInTheDocument();
  });

  test('renders WorkLog link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const workLogLink = screen.getByText(/WorkLog/i);
    expect(workLogLink).toBeInTheDocument();
  });

  test('renders Create button', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const createButton = screen.getByText(/Create/i);
    expect(createButton).toBeInTheDocument();
    expect(createButton).toHaveClass('bg-cambridge-blue');
  });
});
