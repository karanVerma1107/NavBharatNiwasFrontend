import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import Store from '../store.js'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import './toastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={Store}>
    <App />
    <ToastContainer
      position="bottom-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </Provider>
  </StrictMode>
)