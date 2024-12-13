import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Index from './Index.jsx';

const container = document.getElementById('root');
createRoot(container!).render(
  <StrictMode>
    <Index />
  </StrictMode>
);
