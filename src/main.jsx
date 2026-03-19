import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// Enregistrement sécurisé du Service Worker
if (typeof window !== 'undefined') {
  registerSW({ 
    immediate: true,
    onOfflineReady() {
      console.log('App ready for offline use');
    },
    onNeedRefresh() {
      console.log('New content available, please refresh');
    }
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)