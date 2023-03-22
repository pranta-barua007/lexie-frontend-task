import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import './App.css';

const SearchPage = lazy(() => import('@pages/SearchPage'));
const ShowPage = lazy(() => import('@pages/ShowPage'));

import StoreProvider from '@contexts/store.context';
import Spinner from '@components/Spinner';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <StoreProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/:id" element={<ShowPage />} />
          </Routes>
        </Layout>
      </StoreProvider>
    </Suspense>
  );
}

export default App;
