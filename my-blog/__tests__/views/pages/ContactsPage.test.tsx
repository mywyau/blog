import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import messages from '../../../src/messages/contact';
import ContactPage from '../../../src/views/pages/ContactsPage';


describe('ContactPage Component', () => {

    test('renders the contact information correctly', () => {
        render(
            <MemoryRouter>
                <ContactPage />
            </MemoryRouter>
        );

        // Check if phone number is displayed
        expect(screen.getByText(messages.phoneNumber.mobile)).toBeInTheDocument();

        // Check if address components are displayed
        expect(screen.getByText(`${messages.address.houseNumber} ${messages.address.street}`)).toBeInTheDocument();
        expect(screen.getByText(messages.address.county)).toBeInTheDocument();
        expect(screen.getByText(messages.address.city)).toBeInTheDocument();
        expect(screen.getByText(messages.address.country)).toBeInTheDocument();
        expect(screen.getByText(messages.address.postcode)).toBeInTheDocument();

        // Check if email is displayed
        expect(screen.getByText(messages.email)).toBeInTheDocument();
    });

    // test('copies phone number to clipboard', async () => {
    //     // Mock the clipboard API for this specific test
    //     Object.assign(navigator, {
    //         clipboard: {
    //             writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    //         },
    //     });

    //     render(
    //         <MemoryRouter>
    //             <>
    //                 <ContactPage />
    //                 <ToastContainer />
    //             </>
    //         </MemoryRouter>
    //     );

    //     // Simulate clicking the copy icon next to the phone number
    //     const copyPhoneNumberIcon = screen.getByTestId('copy-mobile-number-icon');
    //     fireEvent.click(copyPhoneNumberIcon);

    //     // Check if the clipboard writeText method was called with the correct value
    //     // expect(navigator.clipboard.writeText).toHaveBeenCalledWith(messages.phoneNumber.mobile);

    //     // Check if the toast notification appears
    //     expect(await screen.findByText(/Copied "Mobile number" to clipboard!/)).toBeInTheDocument();
    // });

    // test('copies full address to clipboard', async () => {
    //     // Mock the clipboard API for this specific test
    //     Object.assign(navigator, {
    //         clipboard: {
    //             writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    //         },
    //     });

    //     render(
    //         <MemoryRouter>
    //             <>
    //                 <ContactPage />
    //                 <ToastContainer />
    //             </>
    //         </MemoryRouter>
    //     );

    //     // Simulate clicking the copy icon next to the address
    //     const copyAddressIcon = screen.getByTestId('copy-address-icon');
    //     fireEvent.click(copyAddressIcon);

    //     // Check if the clipboard writeText method was called with the correct value
    //     const fullAddress =
    //         `${messages.address.houseNumber} ${messages.address.street}, ${messages.address.county}, ${messages.address.city}, ${messages.address.country}, ${messages.address.postcode}`;

    //     // expect(navigator.clipboard.writeText).toHaveBeenCalledWith(fullAddress);

    //     // Check if the toast notification appears
    //     expect(await screen.findByText(/Copied "Address" to clipboard!/)).toBeInTheDocument();
    // });

    // test('copies email to clipboard', async () => {
    //     // Mock the clipboard API for this specific test
    //     Object.assign(navigator, {
    //         clipboard: {
    //             writeText: jest.fn().mockImplementation(() => Promise.resolve()),
    //         },
    //     });

    //     render(
    //         <MemoryRouter>
    //             <>
    //                 <ContactPage />
    //                 <ToastContainer />
    //             </>
    //         </MemoryRouter>
    //     );

    //     // Simulate clicking the copy icon next to the email
    //     const copyEmailIcon = screen.getByTestId('copy-email-icon');
    //     fireEvent.click(copyEmailIcon);

    //     // Check if the clipboard writeText method was called with the correct value

    //     // expect(navigator.clipboard.writeText).toHaveBeenCalledWith(messages.email);

    //     // Check if the toast notification appears
    //     expect(await screen.findByText(/Copied "Email" to clipboard!/)).toBeInTheDocument();
    // });
});
