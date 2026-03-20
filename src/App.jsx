import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/PlatformPage';
import HistoryPage from './pages/HistoryPage';
import MotivationPage from './pages/MotivationPage';
import CopywriterPage from './pages/CopywriterPage';
import DescriptionPage from './pages/DescriptionPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/motivation" element={<MotivationPage />} />
          <Route path="/copywriter" element={<CopywriterPage />} />
          <Route path="/description" element={<DescriptionPage />} />
          <Route path="/:platformId" element={<PlatformPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;