import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import store from './redux/store/store.jsx';

try {
  const root = createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering React application:', error);
}



