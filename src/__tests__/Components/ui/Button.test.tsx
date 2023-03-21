import { render, fireEvent, waitFor } from '@testing-library/react';
import Button from '@ui/Button';
import { vi } from 'vitest';

describe('Button', () => {
  test('renders label text', () => {
    const label = 'Click me!';
    const { getByText } = render(<Button label={label} />);
    const button = getByText(label);
    expect(button).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button label="Click me!" onClick={onClick} />);
    const button = getByText('Click me!');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('renders loading spinner when loading prop is true', () => {
    const { getByRole } = render(<Button label="Click me!" loading />);
    const spinner = getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('applies primary styles by default', () => {
    const { container } = render(<Button label="Click me!" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-purple-500 text-white');
  });

  test('applies secondary styles when intent prop is "secondary"', () => {
    const { container } = render(<Button label="Click me!" intent="secondary" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-gray-200 text-gray-900');
  });

  test('applies fullWidth styles when fullWidth prop is true', () => {
    const { container } = render(<Button label="Click me!" fullWidth />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('w-full');
  });

  test('disables button when loading is true', async () => {
    const label = 'Click me';
    const { getByRole } = render(<Button label={label} loading />);
    const button = getByRole('button');
    expect(button).toBeDisabled();

    // Wait for the loading spinner to appear
    await waitFor(() => {
      expect(getByRole('status')).toBeInTheDocument();
    });
  });

  test('shows loading spinner when loading is true', async () => {
    const label = 'Click me';
    const { getByRole } = render(<Button label={label} loading />);
    const spinner = getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
