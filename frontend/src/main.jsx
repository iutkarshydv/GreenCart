import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ShopContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ShopContextProvider>
  </HashRouter>,
)
