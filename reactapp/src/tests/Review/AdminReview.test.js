import { getByTestId, queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Review from '../../components/Admin/Review/Review';

describe('Review Component', () => {
    render(<MemoryRouter><Review /></MemoryRouter>);

    test('fe_react_adminReview', () => {
        const userName = screen.queryByTestId('userName');
        const comments = screen.queryByTestId('comments');

        expect(userName).toBeTruthy();
        expect(comments).toBeTruthy();
    })
    
})