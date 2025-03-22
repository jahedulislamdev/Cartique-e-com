import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Components/Routes/Route.jsx'
import DataProvider from './Components/Provider/DataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={route}></RouterProvider>
    </DataProvider>
  </StrictMode>,
)
