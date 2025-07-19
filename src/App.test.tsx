import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders the main heading and initial row', () => {
    render(<App />);
    const heading = screen.getByText(/Gram Scale Converter/i);
    expect(heading).not.toBeNull();

    const rows = screen.getAllByRole('article');
    expect(rows).toHaveLength(1);
  });

  it('adds a new row when the "More" button is clicked', () => {
    render(<App />);
    const moreButton = screen.getByText(/More/i);
    fireEvent.click(moreButton);

    const rows = screen.getAllByRole('article');
    expect(rows).toHaveLength(2);
  });
});
