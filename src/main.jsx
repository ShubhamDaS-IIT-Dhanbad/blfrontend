import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import store from './redux/store/store.jsx';

try {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} catch (error) {
  console.error('Error rendering React application:', error);
}



