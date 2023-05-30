import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminHomePage from '../../components/Admin/AdminHomePage/AdminHomePage';
import { MemoryRouter } from 'react-router';

describe('Home Page', () => {
  test('fe_react_adminHomePage', () => {
    render(<MemoryRouter><AdminHomePage /></MemoryRouter>);

    const addInstitute = screen.getByTestId('addInstitute');
    const instituteName = screen.getByTestId('instituteName');

    expect(addInstitute).toBeTruthy();
    expect(instituteName).toBeTruthy();
  });
});