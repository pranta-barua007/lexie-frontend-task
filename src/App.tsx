import { Routes, Route } from 'react-router-dom';
import SearchPage from '@pages/SearchPage';
import Layout from './Layout';
import './App.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
