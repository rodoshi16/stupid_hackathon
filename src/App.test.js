import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CringeCraft boot screen', () => {
  render(<App />);
  expect(screen.getByText(/recovering forbidden creator laptop/i)).toBeInTheDocument();
});
