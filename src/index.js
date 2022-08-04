import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App'
import Router from './routes/Router';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router />,
    document.getElementById('root')
);


