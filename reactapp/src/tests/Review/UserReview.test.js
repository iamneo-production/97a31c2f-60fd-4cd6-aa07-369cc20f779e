import { getByTestId, queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Review from '../../components/User/Review/Review';

describe('Review Component', () => {
    render(<MemoryRouter><Review /></MemoryRouter>);

    test('fe_react_userReview', () => {
        const comments = screen.queryByTestId('comments');

        expect(comments).toBeTruthy();
    })
    
})