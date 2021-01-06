import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk'
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
const store = createStore(reducer, applyMiddleware(thunk))
ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
        <App />
    
    </BrowserRouter>
        
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();