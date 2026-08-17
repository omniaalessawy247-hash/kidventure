import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/globals.css'
import './i18n'
import App from './App.jsx'

const initialTheme = (() => {
  try {
    const v = localStorage.getItem('kidventure_theme');
    return v === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
})();

document.documentElement.dataset.theme = initialTheme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)