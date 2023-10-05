import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Jogadores  from './Pages/jogadores'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/jogadores/:nome', element: <Jogadores /> }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
