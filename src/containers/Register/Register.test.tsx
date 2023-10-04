import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '.';
import '../../../matchMedia';

jest.mock('react-router', () => ({
  useNavigate: () => jest.fn(),
}));

describe('test register form', () => {
    test('title render correctly', async () => {
        render(<Register />);
        const title = screen.getByText('Register Page')
        expect(title).toBeDefined();
    })

    test('email input is present', async () => {
        render(<Register />);
        const title = screen.getByPlaceholderText('Name')
        expect(title).toBeDefined();
    })

    test('email input is present', async () => {
        render(<Register />);
        const title = screen.getByPlaceholderText('Email')
        expect(title).toBeDefined();
    })

    test('password input is present', async () => {
        render(<Register />);
        const title = screen.getByPlaceholderText('Password')
        expect(title).toBeDefined();
    })

    test('login button is present', async () => {
        render(<Register />);
        const title = screen.getByText('Login')
        expect(title).toBeDefined();
    })

    test('Register button is present', async () => {
        render(<Register />);
        const title = screen.getByText('Submit')
        expect(title).toBeDefined();
    })
});