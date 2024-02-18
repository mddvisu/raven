import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react'
import '@testing-library/jest-dom'
import Home from '../pages/Home';
import userEvent from '@testing-library/user-event'
global.ResizeObserver = require('resize-observer-polyfill')

test('Test that the welcome screen renders in the app by default and contains a proceed button', () => {
  render(<App />);
  let proceedButton = screen.getByTestId('proceed-button');
  expect(proceedButton).toBeInTheDocument();
});

test('Test that the proceed button navigates to a page with a react flow graph', async () => {
  render(<App />);
  const user = userEvent.setup();
  await user.click(screen.getByTestId('proceed-button'));
  const reactFlowGraph = screen.getByTestId('react-flow-graph');
  expect(reactFlowGraph).toBeInTheDocument();
});
