import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'http://localhost:8081',
  client_id: 'reactJogoDaVelha',
  redirect_uri: 'http://localhost:5173',
  response_type: 'code',
  scope: 'openid profile',
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>  
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
