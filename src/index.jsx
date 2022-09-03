import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './features/store';
import { Provider } from 'react-redux';
import { loadUser } from './features/auth/authSlice';


// store.dispatch(loadUser(null))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



