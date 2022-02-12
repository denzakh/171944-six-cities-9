import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import MainPage from './components/main-page/main-page';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <MainPage />
    </App>
  </React.StrictMode>,
  document.getElementById('root'));
