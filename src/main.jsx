import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Components/Routes/Route.jsx'
import DataProvider from './Components/Provider/DataProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <DataProvider>
        <RouterProvider router={route}></RouterProvider>
      </DataProvider>
    </HelmetProvider>
  </StrictMode>,
)
