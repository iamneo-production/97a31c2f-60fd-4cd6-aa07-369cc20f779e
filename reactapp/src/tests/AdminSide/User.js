import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import User from '../../components/Admin/User/User';
import { MemoryRouter } from 'react-router';

describe('AddDetails', () => {
  test('fe_react_adminUser', () => {
    render(<MemoryRouter><User /></MemoryRouter>);

    const userName = screen.getByTestId('userName');
    const mobile = screen.getByTestId('mobile');
    const qualification = screen.getByTestId('qualification');

    expect(userName).toBeTruthy();
    expect(mobile).toBeTruthy();
    expect(qualification).toBeTruthy();

  });
});