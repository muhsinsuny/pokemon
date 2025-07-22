import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './components/Home.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage.tsx';
// import { ErrorBoundary } from './components/ErrorBoundary.tsx';
// import ListPokemon from './components/ListPokemon.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <ErrorBoundary> */}
        {/* <Route path='/' element={<ListPokemon />} /> */}
        {/* </ErrorBoundary> */}
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:query' element={<SearchPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
