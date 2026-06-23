import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
     <ConfigProvider theme={{ token: { colorPrimary: "#9D6638" } }}>
      <Provider store={store}>
       <App />
       </Provider>
       </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
