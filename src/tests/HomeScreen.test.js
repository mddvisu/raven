import { render, screen } from '@testing-library/react';
import React from 'react'
import '@testing-library/jest-dom'
import Home from '../pages/Home';
global.ResizeObserver = require('resize-observer-polyfill')

test('Test that the home screen contains an open directory button', async () => {
    render(<Home />);
    const openProjectDirectoryExists = screen.getByTestId("open-project-button");
    expect(openProjectDirectoryExists).toBeInTheDocument();
  });

// TODO:
// Test that react flow nodes render properly from class data (3 of these, one for 1 class, another for 3-4 classes, and one for 50 classes)
// Test that react flow nodes connect correctly based on inheritance (3 of these, with varying amounts of inherited classes)
// Test that a tab is opened with the class name once a class node is clicked
// Test that multiple tabs are opened when a class name is clicked twice
// If feasable, test if nodes can be moved around
// If above testing is feasable, test to make sure nodes dont snap back to their original layout when a tab is opened
// Also if feasable, test that the layout button works