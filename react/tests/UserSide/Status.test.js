import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Status from '../../components/User/Status/Status';


describe('Status Component', () => {
    
    render(<MemoryRouter><Status /></MemoryRouter>)

    test('fe_react_userStatus', () => {
       const  status = screen.queryByTestId('status');

       expect(status).toBeTruthy();
    })

})