import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react'
import '@testing-library/jest-dom'
import Home from '../pages/Home';
import {BrowserRouter} from 'react-router-dom'
global.ResizeObserver = require('resize-observer-polyfill')
test('Test that the welcome screen renders and contains a "Proceed" button', async () => {
  render(<App />);
  const openProjectDirectoryExists = screen.getByText(/proceed/i);
  expect(openProjectDirectoryExists).toBeInTheDocument();
});

test('Test that the home screen renders and contains an "Open Project Directory" button', async () => {
    render(<Home />);
    const openProjectDirectoryExists = screen.getByText(/open project directory/i);
    expect(openProjectDirectoryExists).toBeInTheDocument();
  });