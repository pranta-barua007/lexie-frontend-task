import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input, { InputProps } from '@ui/Input';
import { vi } from 'vitest';

describe('Input component', () => {
  const defaultProps: InputProps = {
    label: 'Test Label',
    name: 'test',
  };

  it('renders input with label', () => {
    render(<Input {...defaultProps} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(screen.getByText(defaultProps.label)).toHaveAttribute('for', defaultProps.name);
  });

  it('renders input value', () => {
    const inputValue = 'Test Value';
    render(<Input {...defaultProps} value={inputValue} />);
    const inputElement = screen.getByDisplayValue(inputValue);
    expect(inputElement).toBeInTheDocument();
  });

  it('renders user inputs', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input {...defaultProps} onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    const inputValue = 'New Test Value';
    await user.type(inputElement, inputValue);
    expect(inputElement).toHaveValue(inputValue);
  });

  it('renders error message', () => {
    const errorMessage = 'Test Error Message';
    render(<Input {...defaultProps} errorMessage={errorMessage} />);
    const errorMessageElement = screen.getByText(errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
