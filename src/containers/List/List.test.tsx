import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import List from '.';
import { AppContext } from '../../Provider/AppProvider';
import { useNavigate } from 'react-router';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockCategories =  [
    { key: '1', id: '1', name: 'Category 1', is_active: true },
    { key: '2', id: '2', name: 'Category 2', is_active: false },
];

const response = {
    "data": [],
    "current_page": 1,
    "total_item": 0,
    "total_page": 0
}

global.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
})

describe('List Component', () => {
    beforeAll(() =>{
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onChange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dipatchEvent: jest.fn(),
            })),
        });
    });

    test('renders correctly', async() => {
        render(
            <AppContext.Provider value={{ categories: mockCategories, setCategories:jest.fn(), token: null, setToken: jest.fn() }}>
                <List />
            </AppContext.Provider>
        );
        expect(screen.getByText('List Page')).toBeDefined();
    });

    test('display categories in the table', async() => {
        render(
            <AppContext.Provider value={{ categories: mockCategories, setCategories:jest.fn(), token: null, setToken: jest.fn() }}>
                <List />
            </AppContext.Provider>
        );
        await waitFor(async () => {
            mockCategories.forEach((category) => {
                expect(screen.getByText(category.name)).toBeDefined();
            });
        });
    });    
});
