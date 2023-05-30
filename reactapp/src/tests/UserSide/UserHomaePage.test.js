import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import HomePage from '../../components/User/HomePage/HomePage';


describe('HomePage', () => {
    
    render(<MemoryRouter><HomePage /></MemoryRouter>)

    test('fe_react_userHomePage', () => {
       const  instituteName = screen.queryByTestId('instituteName');
       const  courseName = screen.queryByTestId('courseName');
	   
	   expect(instituteName).toBeTruthy();
       expect(courseName).toBeTruthy();
    })

})