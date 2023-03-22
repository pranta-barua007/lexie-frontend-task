import { Routes, Route } from 'react-router-dom';
import SearchPage from '@pages/SearchPage';
import Layout from './Layout';
import './App.css';
import ShowPage from '@pages/ShowPage';

import StoreProvider from '@contexts/store.context';

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/:id" element={<ShowPage />} />
        </Routes>
      </Layout>
    </StoreProvider>
  );
}

export default App;
