import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UpdateBanner from './components/UpdateBanner.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { LangProvider } from './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <UpdateBanner />
      <AuthProvider>
        <App />
      </AuthProvider>
    </LangProvider>
  </StrictMode>,
)
