import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { appStore } from './store/store';

ReactDOM.createRoot(document.querySelector('.container')!).render(
  <React.StrictMode>
    <Provider store={appStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
