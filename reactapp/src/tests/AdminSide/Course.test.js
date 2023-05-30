import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Course from '../../components/Admin/Course/Course';
import { MemoryRouter } from 'react-router';

describe('AddDetails', () => {
  test('fe_react_adminCourse', () => {
    render(<MemoryRouter><Course /></MemoryRouter>);

    const addCourse = screen.getByTestId('addCourse');
    const courseName = screen.getByTestId('courseName');
    const courseDuriation = screen.getByTestId('courseDuriation');

    expect(addCourse).toBeTruthy();
    expect(courseName).toBeTruthy();
    expect(courseDuriation).toBeTruthy();

  });
});