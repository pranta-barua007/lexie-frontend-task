import { render, screen } from '@testing-library/react';
import Card from '@components/Card';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Card', () => {
  const props = {
    title: 'Beautiful photo',
    location: 'New York',
    photographer: 'John Doe',
    img: 'https://example.com/photo.jpg',
    link: 'nasa_112244',
  };

  it('renders the card correctly', () => {
    render(
      <Router>
        <Card {...props} />
      </Router>,
    );
    const titleElement = screen.getByText('Beautiful photo');
    const locationElement = screen.getByText('New York');
    const photographerElement = screen.getByText('Captured By: John Doe');
    const imgElement = screen.getByAltText('photo');
    const linkElement = screen.getByText('Details') as HTMLAnchorElement;

    expect(titleElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(photographerElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toBe('/' + props.link);
  });
});
