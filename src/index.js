import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function onRegister(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }).catch(function onRegistrationFailure(err) {
      // registration failed :(
      console.error('ServiceWorker registration failed: ', err)
    })
  } else {
    console.log('You can not have nice things :-(')
}
