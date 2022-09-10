import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux" //permite que los componentes anidados accedan al almacenamiento del store
import { store } from "./store";//Es Dios lo ve todo tiene todo permite que el estado se actualice por el dispatch

ReactDOM.render(//siempre se debe rodear la aplicacion o archivo raiz en provider
<Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
   </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
