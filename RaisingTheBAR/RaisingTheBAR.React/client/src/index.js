import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "typeface-roboto";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui'
import axios from 'axios';

axios.defaults.baseURL = 'https://raisingthebarapi.azurewebsites.net';

ReactDOM.render(
    <Router>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Router>, document.getElementById('root'));
    
registerServiceWorker();
