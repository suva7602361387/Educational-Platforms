import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from 'react-hot-toast'
import rootReducer  from './reducer/index.jsx'
const stroe=configureStore({
  reducer:rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Provider store={stroe}>
    <BrowserRouter>
        <App />
        <Toaster/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
