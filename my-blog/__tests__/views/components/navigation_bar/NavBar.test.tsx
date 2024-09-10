import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavbarPages from '../../../../src/models/ADTs/NavbarPages';
import UserTypes from '../../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../../src/models/ADTs/UserTypeErrors';
import AuthService from '../../../../src/service/AuthService';
import Navbar from '../../../../src/views/components/navigation_bar/NavBar';

// Mocking the AuthService to simulate fetching user roles
jest.mock('../../../../src/service/AuthService', () => ({
  getRole: jest.fn(),
}));

// Mocking the useUserRole hook from UserRoleContext to simulate user roles
jest.mock('../../../../src/contexts/UserRoleContext', () => ({
  useUserRole: jest.fn(),
}));

// Mocking the LogoutButton component
jest.mock('../../../../src/views/components/buttons/LogoutButton', () => () => <div>Logout</div>);

describe('Navbar Component', () => {

  beforeEach(() => {
    // Reset mocks before each test to avoid cross-test interference
    jest.clearAllMocks();
  });

  it('renders the Navbar with default links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('applies active class to Home link when on Home page', () => {
    render(
      <MemoryRouter>
        <Navbar page={NavbarPages.Home} />
      </MemoryRouter>
    );
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-3xl text-transparent bg-clip-text');
  });

  it('renders Admin-specific links if user role is Admin', async () => {
    // Mock the getRole method to return Admin
    (AuthService.getRole as jest.Mock).mockResolvedValue({
      _tag: 'Right',
      right: UserTypes.Admin,
    });

    // Mock the useUserRole hook to simulate an Admin user
    const { useUserRole } = require('../../../../src/contexts/UserRoleContext');
    useUserRole.mockReturnValue({ userRole: UserTypes.Admin });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Wait for the async role fetching and check if Admin content is displayed
    expect(await screen.findByText('Logged in as Admin')).toBeInTheDocument();
    expect(screen.getByText('Create Blog Post')).toBeInTheDocument();
  });

  it('renders Viewer-specific content when user role is Viewer', async () => {
    // Mock the getRole method to return Viewer
    (AuthService.getRole as jest.Mock).mockResolvedValue({
      _tag: 'Right',
      right: UserTypes.Viewer,
    });

    // Mock the useUserRole hook to simulate a Viewer user
    const { useUserRole } = require('../../../../src/contexts/UserRoleContext');
    useUserRole.mockReturnValue({ userRole: UserTypes.Viewer });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Wait for the async role fetching and check if Viewer content is displayed
    expect(await screen.findByText('Logged in as Viewer')).toBeInTheDocument();
  });

  it('renders no user-specific content when role fetching fails', async () => {
    // Mock the getRole method to return an error
    (AuthService.getRole as jest.Mock).mockResolvedValue({
      _tag: 'Left',
      left: UserTypeErrors.UnknownUserType,
    });

    // Mock the useUserRole hook to return no role
    const { useUserRole } = require('../../../../src/contexts/UserRoleContext');
    useUserRole.mockReturnValue({ userRole: null });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Ensure no user-specific content is displayed in case of an error
    expect(screen.queryByText('Logged in as Admin')).toBeNull();
    expect(screen.queryByText('Logged in as Viewer')).toBeNull();
  });

  //   it('toggles the mobile menu when the button is clicked', () => {
  //     render(<Navbar />);

  //     const menuButton = screen.getByRole('button');
  //     expect(screen.getByText('Home').closest('div')).toHaveClass('hidden');

  //     // Click to open the mobile menu
  //     fireEvent.click(menuButton);
  //     expect(screen.getByText('Home').closest('div')).toHaveClass('block');

  //     // Click again to close the mobile menu
  //     fireEvent.click(menuButton);
  //     expect(screen.getByText('Home').closest('div')).toHaveClass('hidden');
  //   });
});
