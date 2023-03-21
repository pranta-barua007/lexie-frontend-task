import { render, screen } from '@testing-library/react';
import Card from '@components/Card';

describe('Card', () => {
  const props = {
    title: 'Beautiful photo',
    location: 'New York',
    photographer: 'John Doe',
    img: 'https://example.com/photo.jpg',
    link: 'https://example.com/photo',
  };

  it('renders the card correctly', () => {
    render(<Card {...props} />);
    const titleElement = screen.getByText('Beautiful photo');
    const locationElement = screen.getByText('New York');
    const photographerElement = screen.getByText('Captured By: John Doe');
    const imgElement = screen.getByAltText('photo');
    const linkElement = screen.getByText('Details');

    expect(titleElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(photographerElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('https://example.com/photo');
  });
});
