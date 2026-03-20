import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DesignPage from './pages/DesignPage';
import HistoryPage from './pages/HistoryPage';
import MotivationPage from './pages/MotivationPage';
import CopywriterPage from './pages/CopywriterPage';
import DescriptionPage from './pages/DescriptionPage';
import StoryPage from './pages/StoryPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/design" element={<DesignPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/motivation" element={<MotivationPage />} />
          <Route path="/copy" element={<CopywriterPage />} />
          <Route path="/desc" element={<DescriptionPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;