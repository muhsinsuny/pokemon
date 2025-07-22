import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './components/Home.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import ListPokemon from './components/ListPokemon.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <ErrorBoundary>
          <Route path='/' element={<Home />} />
          <ListPokemon />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/search/:query' element={<SearchPage />} />
        </ErrorBoundary>
      </Routes>
    </Router>
  </StrictMode>
);
