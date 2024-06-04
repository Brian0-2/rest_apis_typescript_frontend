import React from 'react'
import ReactDOM from 'react-dom/client'
//con estos imports enrutamos la plicacion
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
//
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
