import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'

import { AllRoutes } from './routes/AllRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  </StrictMode>,
)
