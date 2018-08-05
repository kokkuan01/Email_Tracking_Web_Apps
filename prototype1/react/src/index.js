import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import createBrowserHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
ReactDOM.render(<App history={history}/>, document.getElementById('body'));
registerServiceWorker();
