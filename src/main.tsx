import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyleProvider } from '@ant-design/cssinjs'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </React.StrictMode>
)
