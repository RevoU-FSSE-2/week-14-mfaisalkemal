import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '.';
import '../../../matchMedia';

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

describe('test login form', () => {
    test('title render correctly', async () => {
        render(<Login />);
        const title = screen.getByText('Login Page')
        expect(title).toBeDefined();
    })

    test('email input is present', async () => {
        render(<Login />);
        const title = screen.getByPlaceholderText('Email')
        expect(title).toBeDefined();
    })

    test('password input is present', async () => {
        render(<Login />);
        const title = screen.getByPlaceholderText('Password')
        expect(title).toBeDefined();
    })

    test('login button is present', async () => {
        render(<Login />);
        const title = screen.getByText('Login')
        expect(title).toBeDefined();
    })

    test('Register button is present', async () => {
        render(<Login />);
        const title = screen.getByText('Register')
        expect(title).toBeDefined();
    })
});