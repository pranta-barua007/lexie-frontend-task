import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { StoreContext } from '@contexts/store.context';
import SearchPage from '@pages/SearchPage';
import { vi } from 'vitest';
import { INasaSearchResult } from '@utils/api/api.types';

import { dataAPI } from '@utils/api/url';

const mockDispatch = vi.fn();

const mockStore = {
  state: {
    collections: [],
    currentCollection: null,
  },
  dispatch: mockDispatch,
};

const mockAxios = new MockAdapter(dataAPI);

const mockCollections: INasaSearchResult[] = [
  {
    data: [
      {
        title: 'Test 1',
        photographer: 'John Doe',
        location: 'New York',
        nasa_id: '123',
        description_508: 'some desc',
        date_created: '1/16/2023' || 'INVALID',
        keywords: ['A'],
      },
    ],
    links: [{ href: 'http://test1.com' }],
  },
  {
    data: [
      {
        title: 'Test 2',
        photographer: 'Jane Smith',
        location: 'London',
        nasa_id: '456',
        description_508: 'some desc',
        date_created: '1/16/2023' || 'INVALID',
        keywords: ['A'],
      },
    ],
    links: [{ href: 'http://test2.com' }],
  },
];
describe('SearchPage', () => {
  beforeEach(() => {
    mockAxios.reset();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the page title and form', () => {
    const { getByText } = render(
      <StoreContext.Provider value={mockStore}>
        <SearchPage />
      </StoreContext.Provider>,
    );

    const textbox = screen.getByRole('textbox');
    const numberButtons = screen.getAllByRole('spinbutton');

    expect(getByText('NASA 🛸 Media Library')).toBeInTheDocument();
    expect(getByText('Sharing the moments of joy')).toBeInTheDocument();
    expect(textbox).toBeInTheDocument();
    expect(numberButtons).toHaveLength(2);
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('displays an error message when the search query is less than 4 characters long', async () => {
    const { getByText, getByRole, getByTestId } = render(
      <StoreContext.Provider value={mockStore}>
        <SearchPage />
      </StoreContext.Provider>,
    );

    const searchInput = getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'tes' } });
    expect(searchInput).toHaveValue('tes');

    fireEvent.submit(getByTestId('form'));

    await waitFor(() => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    const errMessage = getByText(/Must be \d+ characters long!/);
    expect(errMessage).toBeInTheDocument();
  });

  it('dispatches the correct action and displays search results when the form is submitted', async () => {
    mockAxios.onGet('/search').reply(200, {
      collection: { items: mockCollections },
    });

    const { getByRole, getByTestId, getByText } = render(
      <StoreContext.Provider value={mockStore}>
        <SearchPage />
      </StoreContext.Provider>,
    );

    const searchInput = getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'apollo' } });
    fireEvent.submit(getByTestId('form'));

    await waitFor(
      () => {
        expect(mockDispatch).toBeCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'SET_COLLECTIONS',
          payload: mockCollections,
        });
        expect(mockDispatch.mock.calls[0][0]).toEqual({
          type: 'SET_COLLECTIONS',
          payload: mockCollections,
        });
      },
      {
        timeout: 2000,
      },
    );
  });
});
