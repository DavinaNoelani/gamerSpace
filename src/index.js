import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/redux/app/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
